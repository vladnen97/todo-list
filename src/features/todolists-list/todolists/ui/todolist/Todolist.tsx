import React, { memo, useCallback, useEffect } from 'react'
import { AddItemForm } from '../../../../../common/components'
import { TodolistType } from '../../model/todolists-reducer'
import { tasksThunks } from '../../../tasks/model/tasks-reducer'
import { useActions } from '../../../../../common/hooks'
import { TaskResponseType } from '../../../tasks/api/tasks-api-types'
import { FilterTasksButtons } from './filter-tasks-buttons/FilterTasksButtons'
import { Tasks } from '../../../tasks/ui/Tasks'
import { TodolistTitle } from './todolist-title/TodolistTitle'

type TodolistPropsType = {
    todolist: TodolistType
    tasks: Array<TaskResponseType>
}

export const Todolist = memo((props: TodolistPropsType) => {
    const {createTask} = useActions(tasksThunks)
    const { fetchTasks } = useActions(tasksThunks)

    useEffect(() => {
        fetchTasks(props.todolist.id)
    }, [])
    
    const addTask = useCallback((title: string) => createTask({todolistId: props.todolist.id, title }).unwrap(), [props.todolist.id])

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            
            <TodolistTitle todolist={props.todolist}/>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
            <Tasks tasks={props.tasks} filter={props.todolist.filter}/>
            <FilterTasksButtons filter={props.todolist.filter} todolistId={props.todolist.id}/>
            
        </div>
    )
})
