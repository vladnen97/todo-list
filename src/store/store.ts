import {combineReducers, legacy_createStore} from 'redux';
import {todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';


const RootState = combineReducers(
    {
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export type RootStateType = ReturnType<typeof RootState>

export const store = legacy_createStore(RootState)

//@ts-ignore
window.store = store