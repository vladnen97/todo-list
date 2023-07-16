import React, { ChangeEvent, memo, useCallback } from 'react'
import { Checkbox, IconButton } from '@mui/material'
import { DisabledByDefaultOutlined } from '@mui/icons-material'
import { EditableSpan } from '../../../../../common/components'
import { TaskResponseType, TaskStatuses } from '../../api/tasks-api-types'
import { useActions } from '../../../../../common/hooks'
import { tasksThunks } from '../../model/tasks-reducer'

type TaskPropsType = {
    task: TaskResponseType
}

export const Task = memo((props: TaskPropsType) => {
    const { deleteTask, updateTask } = useActions(tasksThunks)

    const removeTaskHandler = () => {
        deleteTask({ todolistId: props.task.todoListId, taskId: props.task.id })
    }
    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({todolistId: props.task.todoListId, taskId: props.task.id, taskModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}})
    }
    const changeTaskTitleHandler = useCallback((title: string) => {
            updateTask({todolistId: props.task.todoListId, taskId: props.task.id, taskModel: {title}})
    }, [props.task.id])

    return (
        <li className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <IconButton aria-label="remove" size="small" onClick={removeTaskHandler}>
                <DisabledByDefaultOutlined fontSize="medium" />
            </IconButton>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={changeTaskStatusHandler} size={'medium'} />
            <EditableSpan title={props.task.title} onChange={changeTaskTitleHandler} />
        </li>
    )
})
