import type {Meta, StoryObj} from '@storybook/react';
import {Task} from '../components/Task';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';


const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    tags: ['autodocs'],
    argTypes: {
        changeStatus: {
            action: 'status changed'
        },
        removeTask: {
            action: 'task removed'
        },
        changeTaskTitle: {
            action: 'task`s title changed'
        }
    },
    args: {
        task: {id: '3-2-1', title: 'JavaScript', status: TaskStatuses.New, todoListId: '', description: '', deadline: '', addedDate: '',
        order: 0, priority: TaskPriorities.Low, startDate: ''},
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskStory: Story = {}

export const TaskCompletedStory: Story = {
    args: {
        task: {id: '1-2-3', title: 'React', status: TaskStatuses.Completed, todoListId: '', description: '', deadline: '', addedDate: '',
            order: 0, priority: TaskPriorities.Low, startDate: ''},
    },
}

