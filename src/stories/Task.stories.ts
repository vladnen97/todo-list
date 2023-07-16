import type { Meta, StoryObj } from "@storybook/react";
import { Task } from "../features/todolists-list/tasks/ui/task/Task";
import {TaskPriorities, TaskStatuses} from '../features/todolists-list/tasks/api/tasks-api-types';

const meta: Meta<typeof Task> = {
    title: "Todolist/Task",
    component: Task,
    tags: ["autodocs"],
    args: {
        task: {
            id: "3-2-1",
            title: "JavaScript",
            status: TaskStatuses.New,
            todoListId: "",
            description: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
        },
    },
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskStory: Story = {};

export const TaskCompletedStory: Story = {
    args: {
        task: {
            id: "1-2-3",
            title: "React",
            status: TaskStatuses.Completed,
            todoListId: "",
            description: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low,
            startDate: "",
        },
    },
};
