import {todolistsReducer, todolistsThunks, TodolistType} from './todolists-reducer';
import { tasksReducer, TasksType } from "../../tasks/model/tasks-reducer";
import { TodolistResponseType } from "../api/todolists-api";

test("ids should be equals", () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistType> = [];

    let todolist: TodolistResponseType = {
        title: "new todolist",
        id: "any id",
        addedDate: "",
        order: 0,
    };

    const endTasksState = tasksReducer(startTasksState, todolistsThunks.createTodolist.fulfilled({ todolist }, 'requestId', '"new todolist"'));
    const endTodolistsState = todolistsReducer(startTodolistsState, todolistsThunks.createTodolist.fulfilled({ todolist }, 'requestId', '"new todolist"'));

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe("any id");
    expect(idFromTodolists).toBe("any id");
});
