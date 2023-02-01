import React from 'react';

type TodolistPropsType = {
    title?: string
    tasks: Array<TaskType>
}

type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {

    let list = tasks.map(elem => <li key={elem.id}><input type="checkbox" checked={elem.isDone}/> <span>{elem.title}</span></li>)

    return (
            <div>
                <h3>{title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {list}
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
    );
};

