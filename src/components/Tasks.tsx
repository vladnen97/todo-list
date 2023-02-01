import React from 'react';

type TaskType = {
    taskId: number
    title: string
    isDone: boolean
}

type TasksPropsType = {
    title: string
    tasks: TaskType[]
    students: string[]
}

const Tasks = ({title, tasks, students}: TasksPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <ul>
                    {tasks.map(elem => <li key={elem.taskId}>
                        <input type="checkbox" checked={elem.isDone}/><span>{elem.title}</span>
                    </li>)}
                </ul>
            </div>
            <select name="students">
                {students.map(st => <option value={st}>{st}</option>)}
            </select>
        </div>
    );
};



export {Tasks,type TasksPropsType,type TaskType};