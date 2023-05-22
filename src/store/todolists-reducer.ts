import {TodolistResponseType, todolistsAPI} from '../api/todolists-api';
import {AppThunk} from './store';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodoListType = TodolistResponseType & { filter: FilterValuesType }

export type TodolistsActionsType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterlistAC>
    | ReturnType<typeof setTodolistsAC>

const initState: Array<TodoListType> = []

export const todolistsReducer = (state = initState, action: TodolistsActionsType): Array<TodoListType> => {
    switch (action.type) {

        case 'SET-TODOLISTS':
            return action.todolists.map(el => ({...el, filter: 'all'}))
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistID)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.todolistId ? {
                ...el,
                title: action.newTitle
            } : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.newFilter} : el)

        default:
            return state
    }
}
//action creators
export const setTodolistsAC = (todolists: Array<TodolistResponseType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const removeTodolistAC = (todolistID: string) => ({type: 'REMOVE-TODOLIST', todolistID} as const)
export const addTodolistAC = (todolist: TodolistResponseType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, newTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const)
export const changeTodolistFilterlistAC = (todolistId: string, newFilter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId, newFilter} as const)

//thunk creators
export const fetchTodolists = (): AppThunk => (dispatch) => {
    todolistsAPI.getTodolists().then(res => dispatch(setTodolistsAC(res.data)))
}
export const removeTodolist = (todolistId: string): AppThunk => dispatch => {
    todolistsAPI.deleteTodolist(todolistId).then(res => dispatch(removeTodolistAC(todolistId)))
}
export const createTodolist = (title: string): AppThunk => dispatch => {
    todolistsAPI.createTodolist(title).then(res => dispatch(addTodolistAC(res.data.data.item)))
}
export const updateTodolist = (todolistId: string, title: string): AppThunk => dispatch => {
    todolistsAPI.updateTodolist(todolistId, title).then(res => dispatch(changeTodolistTitleAC(todolistId, title)))
}

