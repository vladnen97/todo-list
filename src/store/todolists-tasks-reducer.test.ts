import {addTodolistAC, todolistsReducer, TodoListType} from './todolists-reducer';
import {tasksReducer, TasksType} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodoListType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistID)
    expect(idFromTodolists).toBe(action.todolistID)
})