import React from 'react';
import {Task} from './task/Task';
import {TaskResponseType} from '../api/tasks-api-types';
import {FilterValuesType} from '../../todolists/model/todolists-reducer';

type PropsType = {
    tasks: TaskResponseType[]
    filter: FilterValuesType
}

export const Tasks = ({tasks, filter}: PropsType) => {

    if (filter === 'active') {
        tasks = tasks.filter(t => !t.status)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.status)
    }

    const mappedTasks = tasks.map(el => (
        <Task key={el.id} task={el}/>
    ))

    return (
        <ul style={{ padding: '0', listStyleType: 'none' }}>
            {mappedTasks}
        </ul>
    );
};

