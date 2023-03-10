import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
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
            addItem();
        }
    };


    return (
        <div>
            <TextField
                error={!!error}
                size={'small'}
                label='Type value'
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyPressHandler}
                helperText={error}
            />
            <Button onClick={addItem}
                    color="inherit"
                    size="medium"
                    variant="contained">
                +
            </Button>
        </div>
    )
}