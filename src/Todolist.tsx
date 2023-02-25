import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistID: string,taksId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistID: string) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(props.id, trimmedTitle);
            setTitle('');
        } else {
            setTitle('');
            setError('Title is required');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    };
    const filterHandler = (filter: FilterValuesType) => props.changeFilter(props.id, filter);
    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.id)
    }

    const mappedTasks = props.tasks.map(t => {

        const onClickHandler = () => props.removeTask(props.id, t.id);
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, t.id, e.currentTarget.checked);

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <button onClick={onClickHandler}> X</button>
                <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                <span> {t.title} </span>
            </li>
        )})


    return <div>
        <h3>{props.title} <button onClick={deleteTodolistHandler}> X </button></h3>
        <div>
            <input value={title}
                   className={error ? 'error' : ''}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}> {error} </div>}
        </div>
        <ul>
            {mappedTasks}
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={() => filterHandler('all')}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={() => filterHandler('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={() => filterHandler('completed')}>Completed
            </button>
        </div>
    </div>
}
