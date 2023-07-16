import React from 'react'
import { Button, ButtonGroup } from '@mui/material'
import { useActions } from '../../../../../../common/hooks'
import { FilterValuesType, todolistsActions } from '../../../model/todolists-reducer'

type PropsType = {
    filter: FilterValuesType
    todolistId: string
}

export const FilterTasksButtons = ({ todolistId, filter }: PropsType) => {
    const { changeTodolistFilter } = useActions(todolistsActions)

    const changeFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({ filter, todolistId })
    }

    return (
        <ButtonGroup style={{ justifyContent: 'center' }}>
            <Button
                onClick={() => changeFilterHandler('all')}
                color={filter === 'all' ? 'primary' : 'inherit'}
                size="small"
                variant="contained"
                disableElevation>
                All
            </Button>
            <Button
                onClick={() => changeFilterHandler('active')}
                color={filter === 'active' ? 'primary' : 'inherit'}
                size="small"
                variant="contained"
                disableElevation>
                Active
            </Button>
            <Button
                onClick={() => changeFilterHandler('completed')}
                color={filter === 'completed' ? 'primary' : 'inherit'}
                size="small"
                variant="contained"
                disableElevation>
                Completed
            </Button>
        </ButtonGroup>
    )
}

