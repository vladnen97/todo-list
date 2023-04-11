import {TasksType, TaskType} from '../App';
import {v1} from 'uuid';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';


export type TasksActionsType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC> | ReturnType<typeof changeTaskStatusAC> | ReturnType<typeof changeTaskTitleAC> | ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC>

const initState: TasksType = {}

export const tasksReducer = (state = initState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            const newState: TasksType = {...state}
            delete newState[action.todolistID]
            return newState

            // const {[action.todolistID]: [], ...rest} = state
            // return rest
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistID]: []
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        case 'ADD-TASK':
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, isDone: action.newStatus} : el)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id === action.taskId ? {...el, title: action.newTitle} : el)
            }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {type: 'ADD-TASK', todolistId, title} as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, newStatus: boolean) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, newStatus} as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle} as const
}
