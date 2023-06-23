import { instance, ResponseType } from "./index";

export type TaskResponseType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later,
}

export type TaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};
type GetTasksResponseType = {
    error: string;
    totalCount: number;
    items: Array<TaskResponseType>;
};

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskResponseType }>>(`/todo-lists/${todolistId}/tasks`, { title });
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, taskModel: TaskModelType) {
        return instance.put<ResponseType<{ item: TaskResponseType }>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`,
            taskModel
        );
    },
};
