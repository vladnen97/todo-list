import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskModelType, TaskResponseType, tasksAPI} from '../api/tasks-api';
import {AppThunk} from './store';
import {setAppStatus} from './app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';


export type TasksType = {
    [key: string]: Array<TaskResponseType>
}

export type TasksActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>

const initState: TasksType = {}

export const tasksReducer = (state = initState, action: TasksActionsType): TasksType => {
    switch (action.type) {

        case 'SET-TODOLISTS':
            return action.todolists.reduce((acc: TasksType, el) => ({...acc, [el.id]: []}), {})
        case 'REMOVE-TODOLIST':
            const {[action.todolistID]: [], ...rest} = state
            return rest
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolist.id]: []
            }

        case 'SET-TASKS':
            return {
                ...state,
                [action.todolistId]: action.tasks
            }
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(el => el.id === action.task.id ? {...action.task} : el)
            }

        default:
            return state
    }
}


// actions
export const setTasksAC = (todolistId: string, tasks: Array<TaskResponseType>) => ({
    type: 'SET-TASKS',
    tasks,
    todolistId
} as const)
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (task: TaskResponseType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (task: TaskResponseType) => ({type: 'UPDATE-TASK', task} as const)


//thunks
export const fetchTasks = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    tasksAPI.getTasks(todolistId).then(res => {
        dispatch(setTasksAC(todolistId, res.data.items))
        dispatch(setAppStatus('succeeded'))

    })
}
export const deleteTask = (todolistId: string, taskId: string): AppThunk => dispatch => {
    tasksAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todolistId, taskId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => handleServerNetworkError(dispatch, err))
}
export const createTask = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    tasksAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch(err => {
            handleServerNetworkError(dispatch, err)
        })

}
export const updateTask = (todolistId: string, taskId: string, taskModel: TaskModelType): AppThunk => (dispatch, getState) => {

    const task = getState().tasks[todolistId].find(el => el.id === taskId)
    if (!task) {
        console.warn('task not found')
        return
    }

    const model: TaskModelType = {
        title: task.title,
        status: task.status,
        priority: task.priority,
        description: task.description,
        startDate: task.startDate,
        deadline: task.deadline,
        ...taskModel
    }

    tasksAPI.updateTask(todolistId, taskId, model)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(res.data.data.item))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }).catch(err => {
            handleServerNetworkError(dispatch, err)
        }
    )
}
