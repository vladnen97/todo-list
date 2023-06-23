import {todolistsActions, todolistsReducer, TodolistType} from '../todolists-reducer';
import { tasksReducer, TasksType } from "../tasks-reducer";
import { TodolistResponseType } from "../../api/todolists-api";

test("ids should be equals", () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistType> = [];

    let todolist: TodolistResponseType = {
        title: "new todolist",
        id: "any id",
        addedDate: "",
        order: 0,
    };

    const endTasksState = tasksReducer(startTasksState, todolistsActions.addTodolist({ todolist }));
    const endTodolistsState = todolistsReducer(startTodolistsState, todolistsActions.addTodolist({ todolist }));

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe("any id");
    expect(idFromTodolists).toBe("any id");
});
