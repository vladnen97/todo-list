type InitStateType = typeof initState
export type AppActionsType =
    ReturnType<typeof setStatus>
    | ReturnType<typeof setError>


const initState = {
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
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
const setStatus = (status: 'idle' | 'loading' | 'succeeded' | 'failed') => ({type: 'APP/SET-STATUS', status} as const)
const setError = (error: string) => ({type: 'APP/SET-ERROR', error} as const)
//thunk creators


