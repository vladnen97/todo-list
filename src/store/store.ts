import {applyMiddleware, combineReducers, legacy_createStore, Store} from 'redux';
import {TodolistsActionsType, todolistsReducer} from './todolists-reducer';
import {TasksActionsType, tasksReducer} from './tasks-reducer';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';


const RootState = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export type RootStateType = ReturnType<typeof RootState>
type AppActionTypes = TodolistsActionsType | TasksActionsType
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AppActionTypes>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, AppActionTypes>

export const store: Store<RootStateType, AppActionTypes> = legacy_createStore(RootState, applyMiddleware(thunk))

//@ts-ignore
window.store = store