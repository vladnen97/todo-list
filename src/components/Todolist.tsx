import React, {memo, useCallback, useEffect} from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, ButtonGroup, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { Task } from './Task'
import { FilterValuesType, TodolistType } from '../store/todolists-reducer'
import { TaskStatuses } from '../api/tasks-api'
import { TaskResponseType } from '../api/tasks-api'
import {tasksThunks} from '../store/tasks-reducer';
import {useActions} from '../hooks';

type TodolistPropsType = {
    todolist: TodolistType
    /**
     * current todolist tasks
     */
    tasks: Array<TaskResponseType>
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
    let tasks = props.tasks
    const { fetchTasks } = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(props.todolist.id)
    }, [])

    const filterHandler = (filter: FilterValuesType) => props.changeFilter(props.todolist.id, filter)
    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todolist.id)
    }
    const addTask = useCallback(
        (title: string) => {
            props.addTask(props.todolist.id, title)
        },
        [props.addTask, props.todolist.id]
    )
    const changeTodolistTitleHandler = useCallback(
        (newTitle: string) => {
            props.changeTodolistTitle(props.todolist.id, newTitle)
        },
        [props.changeTodolistTitle, props.todolist.id]
    )

    if (props.todolist.filter === 'active') {
        tasks = tasks.filter(t => !t.status)
    }
    if (props.todolist.filter === 'completed') {
        tasks = tasks.filter(t => t.status)
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(props.todolist.id, taskId), [props.removeTask, props.todolist.id])
    const changeStatus = useCallback(
        (taskId: string, status: TaskStatuses) => props.changeStatus(props.todolist.id, taskId, status),
        [props.changeStatus, props.todolist.id]
    )
    const changeTaskTitle = useCallback(
        (taskId: string, value: string) => props.changeTaskTitle(props.todolist.id, taskId, value),
        [props.changeTaskTitle, props.todolist.id]
    )

    const mappedTasks = tasks.map(el => (
        <Task key={el.id} task={el} removeTask={removeTask} changeStatus={changeStatus} changeTaskTitle={changeTaskTitle} />
    ))

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ textAlign: 'center' }}>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitleHandler} />
                <IconButton
                    aria-label="delete"
                    color="default"
                    onClick={deleteTodolistHandler}
                    size={'medium'}
                    disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete fontSize="medium" />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />

            <ul style={{ padding: '0', listStyleType: 'none' }}>{mappedTasks}</ul>

            <ButtonGroup>
                <Button
                    onClick={() => filterHandler('all')}
                    color={props.todolist.filter === 'all' ? 'primary' : 'inherit'}
                    size="small"
                    variant="contained">
                    All
                </Button>
                <Button
                    onClick={() => filterHandler('active')}
                    color={props.todolist.filter === 'active' ? 'primary' : 'inherit'}
                    size="small"
                    variant="contained">
                    Active
                </Button>
                <Button
                    onClick={() => filterHandler('completed')}
                    color={props.todolist.filter === 'completed' ? 'primary' : 'inherit'}
                    size="small"
                    variant="contained">
                    Completed
                </Button>
            </ButtonGroup>
        </div>
    )
})
