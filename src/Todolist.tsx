import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App';

type PropsType = {
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    let [title, setTitle] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask();
        }
    };
    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} className={error ? 'error' : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}> {error} </div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked);

                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={onChangeHandler}/>
                        <span> {t.title} </span>
                        <button onClick={onClickHandler}> X</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
