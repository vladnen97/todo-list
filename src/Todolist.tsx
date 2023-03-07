import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistID: string, taksId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistID: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const filterHandler = (filter: FilterValuesType) => props.changeFilter(props.id, filter);
    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title);
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
        )
    })


    return <div>
        <h3>{props.title}
            <button onClick={deleteTodolistHandler}> X</button>
        </h3>

        <AddItemForm addItem={addTask}/>

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
