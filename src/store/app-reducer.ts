type InitStateType = typeof initState
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsType = ReturnType<typeof setAppStatus> | ReturnType<typeof setAppError>


const initState = {
    status: 'idle' as StatusType,
    error: null as string | null
}


export const appReducer = (state: InitStateType = initState, action: AppActionsType): InitStateType => {
    switch (action.type) {

        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        default:
            return state
    }
}

//action creators
export const setAppStatus = (status: StatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
//thunk creators


