import React, {memo, useCallback, useEffect} from 'react';
import {
    changeTodolistFilterlistAC, clearData,
    createTodolist,
    fetchTodolists,
    FilterValuesType,
    removeTodolist,
    updateTodolist
} from '../store/todolists-reducer';
import {createTask, deleteTask, updateTask} from '../store/tasks-reducer';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {TaskStatuses} from '../api/tasks-api';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from './AddItemForm';
import {Todolist} from './Todolist';
import {Navigate} from 'react-router-dom';

export const TodolistsList = memo(() => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchTodolists())

        return () => {
            dispatch(clearData())
        }
    }, [])


    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [])
    const deleteTodolist = useCallback((todolistId: string): void => {
        dispatch(removeTodolist(todolistId))
    }, [])
    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(updateTodolist(todolistID, newTitle))
    }, [])
    const changeFilter = useCallback((todolistID: string, value: FilterValuesType): void => {
        dispatch(changeTodolistFilterlistAC(todolistID, value))
    }, [])


    const addTask = useCallback((todolistID: string, title: string): void => {
        dispatch(createTask(todolistID, title))
    }, [])
    const removeTask = useCallback((todolistID: string, taskId: string): void => {
        dispatch(deleteTask(todolistID, taskId))
    }, [])
    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses): void => {
        dispatch(updateTask(todolistID, taskId, {status}))
    }, [])
    const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
        dispatch(updateTask(todolistID, taskId, {title}))
    }, [])


    return !isLoggedIn
        ? <Navigate to={'/login'}/>
        : <>
            <Grid container style={{padding: '20px 0 40px 0'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4} justifyContent="space-evenly">
                {
                    todolists.map(el => (
                            <Grid item key={el.id}>
                                <Paper elevation={2} style={{padding: '15px'}}>
                                    <Todolist todolist={el}
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
                        )
                    )
                }
            </Grid>
        </>
})

