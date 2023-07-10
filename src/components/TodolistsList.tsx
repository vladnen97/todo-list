import React, { memo, useCallback, useEffect } from 'react'
import { FilterValuesType, todolistsActions, todolistsThunks } from '../store/todolists-reducer'
import { tasksThunks } from '../store/tasks-reducer'
import { TaskStatuses } from '../api/tasks-api'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from './AddItemForm'
import { Todolist } from './Todolist'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../common/selectors/auth.selectors'
import { selectTodolists } from '../common/selectors/todolists.selectors'
import { selectTasks } from '../common/selectors/tasks.selectors'
import { useActions, useAppSelector } from '../hooks'

export const TodolistsList = memo(() => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const { createTodolist, fetchTodolists, updateTodolist, removeTodolist } = useActions(todolistsThunks)
    const { changeTodolistFilter } = useActions(todolistsActions)
    const { createTask, updateTask, deleteTask } = useActions(tasksThunks)


    useEffect(() => {
        if (!isLoggedIn) return
        fetchTodolists()
    }, [])

    const addTodolist = useCallback((title: string) => {
        createTodolist(title)
    }, [])
    const deleteTodolist = useCallback((todolistId: string): void => {
        removeTodolist(todolistId)
    }, [])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        updateTodolist({ todolistId, title })
    }, [])
    const changeFilter = useCallback((todolistId: string, value: FilterValuesType): void => {
        changeTodolistFilter({ todolistId, filter: value })
    }, [])

    const addTask = useCallback((todolistId: string, title: string): void => {
        createTask({ todolistId, title })
    }, [])
    const removeTask = useCallback((todolistId: string, taskId: string): void => {
        deleteTask({ todolistId, taskId })
    }, [])
    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses): void => {
        updateTask({ todolistId, taskId, taskModel: { status } })
    }, [])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        updateTask({ todolistId, taskId, taskModel: { title } })
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
