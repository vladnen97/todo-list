import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, TextField} from '@mui/material';

export type AddItemFormPropsType = {
    /**
     * Add item with some title
     * @param title title
     */
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = memo(({addItem, disabled = false}: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle);
            setTitle('');
        } else {
            setTitle('');
            setError('Title is required');
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        error && setError(null)
        if (e.key === 'Enter') {
            addItemHandler();
        }
    };


    return (
        <div style={ {display: 'flex', gap: '6px', alignItems: 'flex-start'} }>
            <TextField
                disabled={disabled}
                error={!!error}
                size={'small'}
                label='Type value'
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                helperText={error}
            />
            <Button onClick={addItemHandler}
                    color="inherit"
                    size="medium"
                    variant="contained"
                    disabled={disabled}
                    disableElevation>
                +
            </Button>
        </div>
    )
})