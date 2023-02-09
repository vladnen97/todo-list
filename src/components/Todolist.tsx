import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../App';


type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (task: string) => void
    changeChecked: (id: string) => void
}

export function Todolist(props: PropsType) {
    const [filter, setFilter] = useState<FilterValuesType>('all');
    const [message, setMessage] = useState<string>('')

    function changeFilter(value: FilterValuesType): void {
        setFilter(value);
    }
    function onChangeInputHandler(event: ChangeEvent<HTMLInputElement>): void {
        setMessage(event.currentTarget.value);
    }
    function onKeyPressInputHandler(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.charCode === 13){
            props.addTask(message);
            setMessage('');
        }
    }
    function addTaskHandler(): void {
        props.addTask(message);
        setMessage('');
    }


    let tasksForTodolist:Array<TaskType> = props.tasks;

    if (filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    } else if (filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    let list: JSX.Element[] = tasksForTodolist.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone} onChange={() => props.changeChecked(t.id)}/>
        <span>{t.title} </span>
        <button onClick={() => props.removeTask(t.id)}> X</button>
    </li>)

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={message}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
            />
            <button onClick={addTaskHandler}> + </button>
        </div>
        <ul>
            {list}
        </ul>
        <div>
            <button onClick={() => changeFilter('all')}>All</button>
            <button onClick={() => changeFilter('active')}>Active</button>
            <button onClick={() => changeFilter('completed')}>Completed</button>
        </div>
    </div>
}