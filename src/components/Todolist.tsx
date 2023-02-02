import React from 'react';
import {FilterValuesType} from '../App';

type TodolistPropsType = {
    title?: string
    tasks: Array<TaskType>
    deleteTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}
export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = ({title, tasks, deleteTask, changeFilter}: TodolistPropsType) => {

    let list = tasks.map(elem => <li key={elem.id}>
        <input type="checkbox" checked={elem.isDone}/>
        <span>{elem.title}</span>
        <button onClick={ () => { deleteTask(elem.id)} }>X</button>
    </li>);

    return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>  <button>+</button>
                </div>
                <ul>
                    {list}
                </ul>
                <div>
                    <button onClick={() => {changeFilter("All")} }>All</button>
                    <button onClick={() => {changeFilter('Active')} }>Active</button>
                    <button onClick={() => {changeFilter('Completed')} }>Completed</button>
                </div>
            </div>
    );
};

