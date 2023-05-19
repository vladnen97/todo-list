import {v1} from 'uuid';
import {
    addTodolistAC,
    changeTodolistFilterlistAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC,
    todolistsReducer, TodoListType
} from './todolists-reducer';

let startState: Array<TodoListType>
let TODOLIST_ID_1: string
let TODOLIST_ID_2: string

beforeEach(() => {
    TODOLIST_ID_1 = v1()
    TODOLIST_ID_2 = v1()
    startState = [
        {id: TODOLIST_ID_1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: TODOLIST_ID_2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''},
    ]
})

test('current todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(TODOLIST_ID_1))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to buy')
    expect(endState[0].id).toBe(TODOLIST_ID_2)
})

test('todolist should be added', () => {
    const endState = todolistsReducer(startState, addTodolistAC('New Todolist'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('New Todolist')
    expect(endState[0].filter).toBe('all')
})

test('current todolist title should be changed', () => {
    const endState = todolistsReducer(startState, changeTodolistTitleAC(TODOLIST_ID_2,'Title Changed'))

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(2)
    expect(endState[1]).not.toBe(startState[1])
    expect(endState[1].title).toBe('Title Changed')
    expect(endState[0].title).toBe('What to learn')
})

test('current todolist filter should be changed', () => {
    const endState = todolistsReducer(startState, changeTodolistFilterlistAC(TODOLIST_ID_1, 'active'))

    expect(endState).not.toBe(startState)
    expect(endState.length).toBe(2)
    expect(endState[0]).not.toBe(startState[0])
    expect(endState[1].filter).toBe('all')
    expect(endState[0].filter).toBe('active')
})

test('todolists should be set to the state', () => {

    const action = setTodolistsAC(startState)
    const endState = todolistsReducer([], action)

    expect(endState).toEqual(startState)
})
