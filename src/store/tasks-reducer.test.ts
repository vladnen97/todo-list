import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskStatuses} from '../api/tasks-api';

let startState: TasksType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''}
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const endState = tasksReducer(startState, removeTaskAC('todolistId2', '2' ))

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''},
            {id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', startDate: '', priority: 0, description: '',order: 0, addedDate: '', deadline: ''}
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC('todolistId2', 'juice')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juice')
    expect(endState['todolistId2'][0].status).toBe(0)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New)
    const endState = tasksReducer(startState, action)

    expect(endState).not.toBe(startState)

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
})

test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('todolistId2', '2', 'sugar')
    const endState = tasksReducer(startState, action)

    expect(endState).not.toBe(startState)

    expect(endState['todolistId1'][1].title).toBe('JS')
    expect(endState['todolistId2'][1].title).toBe('sugar')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})