import {authAPI} from '../api/auth-api';
import {AppThunk} from './store';
import {setIsLoggedInAC} from './auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

type InitStateType = typeof initState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setIsInitialized>


const initState = {
    status: 'idle' as StatusType,
    error: null as string | null,
    isInitialized: false
}


export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
    switch (action.type) {

        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.value}

        default:
            return state
    }
}

//action
export const setAppStatus = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setIsInitialized = (value: boolean) => ({type: 'APP/SET-INITIALIZED', value} as const)

//thunk

export const initializeAppTC = (): AppThunk => dispatch => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
            handleServerAppError(dispatch, res.data)
        }
    }).catch(e => {
        handleServerNetworkError(dispatch, e)
    }).finally(() => {
        dispatch(setIsInitialized(true))
    })
}
