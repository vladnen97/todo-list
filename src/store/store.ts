import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import {TasksActionsType, tasksReducer} from './tasks-reducer';
import thunk, {ThunkAction} from 'redux-thunk';


const RootState = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export type RootStateType = ReturnType<typeof RootState>
type AppActionTypes = TodolistsActionsType | TasksActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionTypes>

export const store = legacy_createStore(RootState, applyMiddleware(thunk))

//@ts-ignore
window.store = store