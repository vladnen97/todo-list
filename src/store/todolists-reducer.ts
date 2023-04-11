import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';


export type TodolistsActionsType = ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC> | ReturnType<typeof changeTodolistTitleAC> | ReturnType<typeof changeTodolistFilterlistAC>

const initState: Array<TodoListType> = []

export const todolistsReducer = (state = initState, action: TodolistsActionsType): Array<TodoListType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistID)
        case 'ADD-TODOLIST':
            const newTodolist: TodoListType = {
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

export const removeTodolistAC = (todolistID: string) => {
    return {type: 'REMOVE-TODOLIST', todolistID} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title: title, todolistID: v1()} as const
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string)=> {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID, newTitle} as const
}
export const changeTodolistFilterlistAC = (todolistID: string, newFilter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID, newFilter} as const
}

