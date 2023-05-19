import {v1} from 'uuid';
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
            const newTodolist: TodoListType = {
                addedDate: '',
                order: 0,
                id: action.todolistID,
                title: action.title,
                filter: 'all'
            }
            return [newTodolist, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.todolistID ? {
                ...el,
                title: action.newTitle
            } : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.todolistID ? {...el, filter: action.newFilter} : el)

        default:
            return state
    }
}
//action creators
export const removeTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', todolistID} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistID: v1()} as const
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID, newTitle} as const
}
export const changeTodolistFilterlistAC = (todolistID: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID, newFilter} as const
}
export const setTodolistsAC = (todolists: Array<TodolistResponseType>) => ({type: 'SET-TODOLISTS', todolists} as const)

//thunk creators
export const fetchTodolists = (): AppThunk => (dispatch) => {
    todolistsAPI.getTodolists().then(res => dispatch(setTodolistsAC(res.data)))
}

