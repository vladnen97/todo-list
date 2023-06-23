import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { tasksAPI } from "../api/tasks-api";

const meta: Meta = {
    title: "API/Tasks",
};

export default meta;
type Story = StoryObj;

const GetC = () => {
    const [state, setState] = useState<any>([]);
    const [todolistId, setTodolistId] = useState("dd6682f6-1324-41af-ad1e-2ceb60f4ae75");

    const onClickHandler = () => {
        tasksAPI
            .getTasks(todolistId)
            .then((res) => setState(res.data.items.map((el) => `${el.title} : ${el.id} : ${el.status}`)));
        setTodolistId("");
    };

    return (
        <>
            <ul>{state.length !== 0 ? state.map((el: any) => <li key={el}>{el}</li>) : "no tasks"}</ul>
            <input
                value={todolistId}
                placeholder={"enter todolist id "}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <button onClick={onClickHandler}>get tasks</button>
        </>
    );
};
export const GetTasks: Story = {
    render: () => <GetC />,
};

const PostC = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("dd6682f6-1324-41af-ad1e-2ceb60f4ae75");
    const [title, setTitle] = useState<string>("");

    const onClickHandler = () => {
        tasksAPI.createTask(todolistId, title).then((res) => {
            setState(res.data);
        });
        setTitle("");
    };

    return (
        <>
            <input
                placeholder={"enter todolist id"}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
                required
            />
            <input
                placeholder={"enter task title"}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
                required
            />
            <button onClick={onClickHandler}>add task</button>
            <h2>------------</h2>
            <div>{JSON.stringify(state)}</div>
        </>
    );
};
export const CreateTask: Story = {
    render: () => <PostC />,
};

const DeleteC = () => {
    const [state, setState] = useState<any>(null);
    const [todoId, setTodoId] = useState("dd6682f6-1324-41af-ad1e-2ceb60f4ae75");
    const [taskId, setTaskId] = useState("");

    const onClickHandler = () => {
        tasksAPI.deleteTask(todoId, taskId).then((res) => setState(res.data));
        setTaskId("");
    };

    return (
        <>
            <input
                value={todoId}
                onChange={(e) => setTodoId(e.currentTarget.value)}
                placeholder={"enter todolist id "}
            />
            <input value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)} placeholder={"enter task id "} />
            <button onClick={onClickHandler}>delete task</button>
            <h3>-----------</h3>
            <div>{JSON.stringify(state)}</div>
        </>
    );
};
export const DeleteTask: Story = {
    render: () => <DeleteC />,
};

const UpdateC = () => {
    const [todoId, setTodoId] = useState("dd6682f6-1324-41af-ad1e-2ceb60f4ae75");
    const [taskId, setTaskId] = useState("4a225ad0-8f7b-4277-acd8-0fd616be703d");
    const [title, setTitle] = useState("");
    const [state, setState] = useState<any>(null);

    const onclickHandler = () => {
        tasksAPI.updateTask(todoId, taskId, { title }).then((res) => setState(res.data));
    };

    return (
        <>
            <div>
                <input
                    value={todoId}
                    onChange={(e) => setTodoId(e.currentTarget.value)}
                    placeholder={"enter todolist id"}
                />
                <input
                    value={taskId}
                    onChange={(e) => setTaskId(e.currentTarget.value)}
                    placeholder={"enter task id"}
                />
            </div>
            <input value={title} onChange={(e) => setTitle(e.currentTarget.value)} placeholder={"enter task title"} />
            <button onClick={onclickHandler}>update task</button>
            <h2>----------</h2>
            <div>{JSON.stringify(state)}</div>
        </>
    );
};
export const UpdateTask: Story = {
    render: () => <UpdateC />,
};
