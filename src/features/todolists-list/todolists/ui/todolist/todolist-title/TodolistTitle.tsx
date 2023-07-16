import React from 'react'
import { EditableSpan } from '../../../../../../common/components'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useActions } from '../../../../../../common/hooks'
import { todolistsThunks, TodolistType } from '../../../model/todolists-reducer'

type PropsType = {
    todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: PropsType) => {
    const { removeTodolist, updateTodolist } = useActions(todolistsThunks)

    const deleteTodolistHandler = () => {
        removeTodolist(todolist.id)
    }
    const changeTodolistTitleHandler = (title: string) => {
        updateTodolist({ todolistId: todolist.id, title })
    }

    return (
        <h3 style={{ textAlign: 'center' }}>
            <EditableSpan title={todolist.title} onChange={changeTodolistTitleHandler} />
            <IconButton
                aria-label="delete"
                color="default"
                onClick={deleteTodolistHandler}
                size={'medium'}
                disabled={todolist.entityStatus === 'loading'}>
                <Delete fontSize="medium" />
            </IconButton>
        </h3>
    )
}

