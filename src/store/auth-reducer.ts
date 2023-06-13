import {setAppStatus} from './app-reducer';
import {AppThunk} from './store';
import {authAPI, LoginParamsType} from '../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

type InitStateType = typeof initState
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>

const initState = {
    isLoggedIn: false
}

export const authReducer = (state: InitStateType = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunks
export const loginTC = (params: LoginParamsType): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))

        const res = await authAPI.login(params)

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (e) {
        handleServerNetworkError(dispatch, e)
    }
}

export const logoutTC = (): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error) => {
            handleServerNetworkError(dispatch, error)
        })
}