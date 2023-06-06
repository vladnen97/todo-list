type InitStateType = typeof initState
type AuthActionsType = any

const initState = {}

export const authReducer = (state:InitStateType = initState, action: AuthActionsType): InitStateType => {
    switch (action.type) {

        default:
            return state
    }
}


//actions



//thunks