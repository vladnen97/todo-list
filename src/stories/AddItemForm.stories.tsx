import {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from '../components/AddItemForm';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

const meta: Meta<typeof AddItemForm> = {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            action: 'add with value'
        }
    },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {}

const AddItemFormStoryWithhooks = (props: AddItemFormPropsType) => {
        const [title, setTitle] = useState<string>('');
        const [error, setError] = useState<string | null>('Title is required');

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
                    label="Type value"
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

export const AddItemFormStoryWithError: Story = {
    render: args => <AddItemFormStoryWithhooks {...args}/>
}
