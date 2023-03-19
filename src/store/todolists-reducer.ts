import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistID: string
}
type AddTodolistActionType = {
    type: 'ADD-TODOLST'
    title: string
}
type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistID: string
    newTitle: string
}
type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistID: string
    newFilter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistID)

        case 'ADD-TODOLST':
            const newTodolist: TodoListType = {
                id: v1(),
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
            throw new Error('invalid action type')
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistID}
}
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLST', title: title}
}
export const changeTodolistTitleAC = (todolistID: string, newTitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistID, newTitle}
}
export const changeTodolistFilterlistAC = (todolistID: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistID, newFilter}
}

