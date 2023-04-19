import {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from '../AddItemForm';
import React from 'react';

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
