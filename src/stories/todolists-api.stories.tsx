import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { todolistsAPI } from "../api/todolists-api";

const meta: Meta = {
    title: "API/Todolists",
};

export default meta;
type Story = StoryObj;

const GetC = () => {
    const [state, setState] = useState<any>([]);
    useEffect(() => {
        todolistsAPI.getTodolists().then((res) => setState(res.data));
    }, []);

    return (
        <ul>
            {state.length !== 0
                ? state.map((el: any) => <li key={el.id}>{el.title + "  :  " + el.id}</li>)
                : "no todolists"}
        </ul>
    );
};
export const GetTodolists: Story = {
    render: () => <GetC />,
};

const PostC = () => {
    const [state, setState] = useState<any>(null);
    const [value, setValue] = useState<string>("");

    const onClickHandler = () => {
        todolistsAPI.createTodolist(value).then((res) => {
            setState(res.data);
            setValue("");
        });
    };

    return (
        <>
            <div>{JSON.stringify(state)}</div>
            <input
                placeholder={"enter todolist title"}
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button onClick={onClickHandler}>add todolist</button>
        </>
    );
};
export const CreateTodolist: Story = {
    render: () => <PostC />,
};

const DeleteC = () => {
    const [todos, setTodos] = useState<any>([]);
    const [state, setState] = useState<any>(null);
    const [value, setValue] = useState<string>("");
    useEffect(() => {
        todolistsAPI
            .getTodolists()
            .then((res) => setTodos(res.data.reduce((acc: Array<string>, el) => [...acc, el.id], [])));
    }, [state]);

    const onClickHandler = () => {
        todolistsAPI.deleteTodolist(value).then((res) => {
            setState(res.data);
            setValue("");
        });
    };

    return (
        <>
            <h3>available todolists id</h3>
            <ul>
                {todos.map((el: any) => (
                    <li key={el}>{el}</li>
                ))}
            </ul>
            <input value={value} onChange={(e) => setValue(e.currentTarget.value)} placeholder={"enter todolist ID"} />
            <button onClick={onClickHandler}>delete todolist</button>
            <div>{JSON.stringify(state)}</div>
        </>
    );
};
export const DeleteTodolist: Story = {
    render: () => <DeleteC />,
};

const UpdateC = () => {
    const [state, setState] = useState<any>(null);
    const [todos, setTodos] = useState<Array<string>>([]);
    const [title, setTitle] = useState<string>("");
    const [id, setId] = useState<string>("");

    useEffect(() => {
        todolistsAPI.getTodolists().then((res) => {
            setTodos(res.data.reduce((acc: Array<string>, el) => [...acc, el.title + " : " + el.id], []));
        });
    }, [state]);

    const onClickHandler = () => {
        todolistsAPI.updateTodolist(id, title).then((res) => {
            console.log(res.data);
            setState(res.data);
            setTitle("");
            setId("");
        });
    };

    return (
        <>
            <h3>todos</h3>
            <ul>
                {todos.map((el) => (
                    <li key={el}>{el}</li>
                ))}
            </ul>
            <input
                placeholder={"enter todolist title"}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <input placeholder={"enter todolist id"} value={id} onChange={(e) => setId(e.currentTarget.value)} />
            <button onClick={onClickHandler}>update title</button>
        </>
    );
};
export const UpdateTodolistTitle: Story = {
    render: () => <UpdateC />,
};
