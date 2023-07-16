import {
    FilterValuesType, todolistsActions,
    todolistsReducer, todolistsThunks,
    TodolistType,
} from './todolists-reducer';
import { v1 } from "uuid";
import { TodolistResponseType } from "../api/todolists-api";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        { id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0 },
        { id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "", order: 0 },
    ];
});

test("correct todolist should be removed", () => {
    const endState = todolistsReducer(startState, todolistsThunks.removeTodolist.fulfilled({ todolistId: todolistId1 }, 'requestId', todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
    let todolist: TodolistResponseType = {
        title: "New Todolist",
        id: "any id",
        addedDate: "",
        order: 0,
    };

    const endState = todolistsReducer(startState, todolistsThunks.createTodolist.fulfilled({ todolist }, 'requestId', "New Todolist"));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
    const action = todolistsThunks.updateTodolist.fulfilled({ todolistId: todolistId2,title: "New Todolist" }, 'requestId', { todolistId: todolistId2,title: "New Todolist" });

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New Todolist");
});

test("correct filter of todolist should be changed", () => {
    let newFilter: FilterValuesType = "completed";

    const action = todolistsActions.changeTodolistFilter({ todolistId: todolistId2,filter: newFilter });

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test("todolists should be added", () => {
    const action = todolistsThunks.fetchTodolists.fulfilled({ todolists: startState }, 'requestId');

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});
test("correct entity status of todolist should be changed", () => {
    const action = todolistsActions.changeTodolistEntityStatus({todolistId: todolistId2,entityStatus: 'loading'});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe("loading");
});
