import React, {memo, useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist = memo((props: TodolistPropsType) => {

    let tasks = props.tasks

    const filterHandler = (filter: FilterValuesType) => props.changeFilter(props.id, filter)
    const deleteTodolistHandler = () => {props.deleteTodolist(props.id)}
    const addTask = useCallback((title: string) => {props.addTask(props.id, title)}, [props.addTask, props.id])
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)}, [props.changeTodolistTitle, props.id])

    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(props.id, taskId), [props.removeTask, props.id])
    const changeStatus = useCallback((taskId: string, newIsDone: boolean) => {
        props.changeStatus(props.id, taskId, newIsDone)
    }, [props.changeStatus, props.id])
    const changeTaskTitle = useCallback((taskId: string, value: string) => {
        props.changeTaskTitle(props.id, taskId, value)}, [props.changeTaskTitle, props.id])

    const mappedTasks = tasks.map(el => <Task key={el.id} task={el} removeTask={removeTask} changeStatus={changeStatus} changeTaskTitle={changeTaskTitle}/>)


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
})
