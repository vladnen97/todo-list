import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';
import {FilterValuesType} from '../store/todolists-reducer';
import {fetchTasks} from '../store/tasks-reducer';
import {TaskStatuses} from '../api/tasks-api';
import {TaskResponseType} from '../api/tasks-api';
import {useAppDispatch} from '../hooks/hooks';

type TodolistPropsType = {
    /**
     * todolist id
     */
    id: string
    /**
     * todolist title
     */
    title: string
    /**
     * current todolist tasks
     */
    tasks: Array<TaskResponseType>
    /**
     * current todolist filter status
     */
    filter: FilterValuesType
    /**
     * remove current todolist task handler
     * @param todolistID todolist id
     * @param taskId task id
     */
    removeTask: (todolistID: string, taskId: string) => void
    /**
     * change current todolist filter status handler
     * @param todolistID todolist id
     * @param value new filter value
     */
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    /**
     * add task to current todolist handler
     * @param todolistID todolist id
     * @param title new todolist title
     */
    addTask: (todolistID: string, title: string) => void
    /**
     * change current todolist task status handler
     * @param todolistID todolist id
     * @param taskId task id
     * @param isDone new status
     */
    changeStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    /**
     * delete current todolist handler
     * @param todolistID todolist id
     */
    deleteTodolist: (todolistID: string) => void
    /**
     * change current todolist task title handler
     * @param todolistID todolist id
     * @param taskId task id
     * @param newTitle new task title
     */
    changeTaskTitle: (todolistID: string, taskId: string, newTitle: string) => void
    /**
     * change current todolist title handler
     * @param todolistID todolist id
     * @param newTitle new todolist title
     */
    changeTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const Todolist = memo((props: TodolistPropsType) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasks(props.id))
    }, [])

    let tasks = props.tasks

    const filterHandler = (filter: FilterValuesType) => props.changeFilter(props.id, filter)
    const deleteTodolistHandler = () => {props.deleteTodolist(props.id)}
    const addTask = useCallback((title: string) => {props.addTask(props.id, title)}, [props.addTask, props.id])
    const changeTodolistTitleHandler = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)}, [props.changeTodolistTitle, props.id])

    if (props.filter === 'active') {
        tasks = tasks.filter(t => !t.status);
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(t => t.status);
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(props.id, taskId), [props.removeTask, props.id])
    const changeStatus = useCallback((taskId: string, status: TaskStatuses) => {
        props.changeStatus(props.id, taskId, status)
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
