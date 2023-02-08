import React, {useState} from 'react';
import {FilterValuesType} from '../App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    deleteAll: () => void
}

export function Todolist(props: PropsType) {
    let [filter, setFilter] = useState<FilterValuesType>('all');

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodolist = props.tasks;

    if (filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    } else if (filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    } else if (filter === 'three') {
        tasksForTodolist = props.tasks.filter((t) => t.id < 4);
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title} </span>
                    <button onClick={() => props.removeTask(t.id)}> X </button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={props.deleteAll}>Delete All</button>
        </div>
        <div>
            <button onClick={() => changeFilter('all')}>All</button>
            <button onClick={() => changeFilter('active')}>Active</button>
            <button onClick={() => changeFilter('completed')}>Completed</button>
            <button onClick={() => changeFilter('three')}>show thirst three</button>
        </div>
    </div>
}