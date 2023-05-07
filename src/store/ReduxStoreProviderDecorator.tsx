import React from 'react'
import { Provider } from 'react-redux'
import {combineReducers, legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import {RootStateType} from './store';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';
import {TaskStatuses} from '../api/tasks-api';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''}
        ]
    }
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootStateType)




export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)