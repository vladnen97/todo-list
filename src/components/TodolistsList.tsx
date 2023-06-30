import React, { memo, useCallback, useEffect } from 'react'
import {
    createTodolistTC,
    fetchTodolists,
    FilterValuesType,
    removeTodolistTC,
    todolistsActions,
    updateTodolistTC,
} from '../store/todolists-reducer'
import { tasksThunks } from '../store/tasks-reducer'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { TaskStatuses } from '../api/tasks-api'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from './AddItemForm'
import { Todolist } from './Todolist'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../utils/selectors/auth.selectors'
import { selectTodolists } from '../utils/selectors/todolists.selectors'
import { selectTasks } from '../utils/selectors/tasks.selectors'


export const TodolistsList = memo(() => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchTodolists())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title))
    }, [])
    const deleteTodolist = useCallback((todolistId: string): void => {
        dispatch(removeTodolistTC(todolistId))
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(updateTodolistTC(todolistId, newTitle))
    }, [])
    const changeFilter = useCallback((todolistId: string, value: FilterValuesType): void => {
        dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter: value }))
    }, [])

    const addTask = useCallback((todolistId: string, title: string): void => {
        dispatch(tasksThunks.createTask({ todolistId, title }))
    }, [])
    const removeTask = useCallback((todolistId: string, taskId: string): void => {
        dispatch(tasksThunks.deleteTask({ todolistId, taskId }))
    }, [])
    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses): void => {
        dispatch(tasksThunks.updateTask({todolistId, taskId, taskModel: {status}}))
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(tasksThunks.updateTask({todolistId, taskId, taskModel: {title}}))
    }, [])

    return !isLoggedIn ? (
        <Navigate to={'/login'} />
    ) : (
        <>
            <Grid container style={{ padding: '20px 0 40px 0' }}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid container spacing={4} justifyContent="space-evenly">
                {todolists.map(el => (
                    <Grid item key={el.id}>
                        <Paper elevation={2} style={{ padding: '15px' }}>
                            <Todolist
                                todolist={el}
                                tasks={tasks[el.id]}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                deleteTodolist={deleteTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    )
})
