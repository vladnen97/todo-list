import {TodolistResponseType, todolistsAPI} from '../api/todolists-api';
import {AppThunk} from './store';
import {setAppStatus, RequestStatusType} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = TodolistResponseType & { filter: FilterValuesType, entityStatus: RequestStatusType }

export type TodolistsActionsType =
    ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterlistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatus>
    | ReturnType<typeof clearData>

const initState: Array<TodolistType> = []

export const todolistsReducer = (state = initState, action: TodolistsActionsType): Array<TodolistType> => {
    switch (action.type) {

        case 'SET-TODOLISTS':
            return action.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todolistID)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(el => el.id === action.todolistId ? {...el, title: action.newTitle} : el)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(el => el.id === action.todolistId ? {...el, filter: action.newFilter} : el)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(el => el.id === action.todolistId ? {...el, entityStatus: action.entityStatus} : el)
        case 'CLEAR-DATA':
            return []

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
export const changeTodolistEntityStatus = (todolistId: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, todolistId} as const)
export const clearData = () => ({type: 'CLEAR-DATA'} as const)

//thunk creators
export const fetchTodolists = (): AppThunk => (dispatch) => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data))
        dispatch(setAppStatus('succeeded'))
    }).catch(err => {
        handleServerNetworkError(dispatch, err)
    })
}
export const removeTodolist = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistsAPI.deleteTodolist(todolistId).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
            dispatch(changeTodolistEntityStatus(todolistId, 'failed'))
        }
    }).catch(err => handleServerNetworkError(dispatch, err))
}
export const createTodolist = (title: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    todolistsAPI.createTodolist(title).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }).catch(err => {
        handleServerNetworkError(dispatch, err)
    })
}
export const updateTodolist = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))

    todolistsAPI.updateTodolist(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistId, title))
                dispatch(setAppStatus('succeeded'))
            }
            else handleServerAppError(dispatch, res.data)
        })
        .catch(err => handleServerNetworkError(dispatch, err))
}

