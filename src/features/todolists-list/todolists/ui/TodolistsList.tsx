import React, { memo, useCallback, useEffect } from 'react'
import { todolistsThunks } from '../model/todolists-reducer'
import { Grid, Paper } from '@mui/material'
import { AddItemForm } from '../../../../common/components'
import { Navigate } from 'react-router-dom'
import { selectIsLoggedIn } from '../../../../common/selectors/auth.selectors'
import { selectTodolists } from '../../../../common/selectors/todolists.selectors'
import { selectTasks } from '../../../../common/selectors/tasks.selectors'
import { useActions, useAppSelector } from '../../../../common/hooks'
import { Todolist } from './todolist/Todolist'

export const TodolistsList = memo(() => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const { createTodolist, fetchTodolists } = useActions(todolistsThunks)

    useEffect(() => {
        if (!isLoggedIn) return
        fetchTodolists()
    }, [])

    const addTodolistCallback = useCallback((title: string) => createTodolist(title).unwrap(), [])

    return !isLoggedIn ? (
        <Navigate to={'/login'} />
    ) : (
        <>
            <Grid container style={{ padding: '20px 0 40px 0', justifyContent: 'center' }}>
                <AddItemForm addItem={addTodolistCallback} />
            </Grid>
            <Grid container spacing={4}>
                {todolists.map(el => (
                    <Grid item key={el.id}>
                        <Paper elevation={2} style={{ padding: '15px', width: '332px'}}>
                            <Todolist todolist={el} tasks={tasks[el.id]} />
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </>
    )
})
