import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {DisabledByDefaultOutlined} from '@mui/icons-material';
import {EditableSpan} from './EditableSpan';
import {TaskType} from './AppWithRedux';

type TaskPropsType = {
    /**
     * task with title and status
     */
    task: TaskType
    /**
     * remove task handler
     * @param taskId task id
     */
    removeTask: (taskId: string) => void
    /**
     * change task status handler
     * @param taskId task id
     * @param isDone new task status
     */
    changeStatus: (taskId: string, isDone: boolean) => void
    /**
     * change task title handler
     * @param taskId task id
     * @param newTitle new task title
     */
    changeTaskTitle: (taskId: string, newTitle: string) => void
}

export const Task = memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id)
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(props.task.id, e.currentTarget.checked)
    const onChangeTaskTitleHandler = useCallback((value: string) => {props.changeTaskTitle(props.task.id, value)}, [props.changeTaskTitle, props.task.id])

    return (
        <li className={props.task.isDone ? 'is-done' : ''} >
            <IconButton  aria-label="remove" size="small" onClick={onClickHandler}>
                <DisabledByDefaultOutlined fontSize="medium"/>
            </IconButton>
            <Checkbox checked={props.task.isDone}
                      onChange={onChangeStatusHandler}
                      size={'medium'}/>
            <EditableSpan title={props.task.title} onChange={onChangeTaskTitleHandler}/>
        </li>
    );
})

