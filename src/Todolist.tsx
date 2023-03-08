import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@mui/material';
import {Delete, DisabledByDefaultOutlined} from '@mui/icons-material';

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
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export function Todolist(props: TodolistPropsType) {

    const filterHandler = (filter: FilterValuesType) => props.changeFilter(props.id, filter);
    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title);
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    }

    const mappedTasks = props.tasks.map(t => {

        const onClickHandler = () => props.removeTask(props.id, t.id);
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.id, t.id, e.currentTarget.checked);
        const onChangeTaskTitleHandler = (value: string) => {
            props.changeTaskTitle(props.id, t.id, value);
        }

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''} >
                <IconButton  aria-label="remove" size="small" onClick={onClickHandler}>
                    <DisabledByDefaultOutlined fontSize="medium"/>
                </IconButton>
                <Checkbox checked={t.isDone}
                          onChange={onChangeStatusHandler}
                size={'medium'}/>
                <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler}/>
            </li>
        )
    })


    return <div style={  {display: 'flex', flexDirection: 'column', alignItems: 'center'}  }>

        <h3 style={ {textAlign: 'center'} }><EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
            <IconButton aria-label="delete" color="default" onClick={deleteTodolistHandler} size={'medium'}>
                <Delete fontSize="medium"/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>

        <ul style={ {padding: '0', listStyleType: 'none'} }>
            {mappedTasks}
        </ul>

        <ButtonGroup>
            <Button onClick={() => filterHandler('all')}
                    color={props.filter === 'all' ? 'primary' : 'inherit'}
                    disabled={false}
                    size="small"
                    variant="contained">
                All
            </Button>
            <Button onClick={() => filterHandler('active')}
                    color={props.filter === 'active' ? 'primary' : 'inherit'}
                    disabled={false}
                    size="small"
                    variant="contained">
                Active
            </Button>
            <Button onClick={() => filterHandler('completed')}
                    color={props.filter === 'completed' ? 'primary' : 'inherit'}
                    disabled={false}
                    size="small"
                    variant="contained">
                Completed
            </Button>
        </ButtonGroup>
    </div>
}
