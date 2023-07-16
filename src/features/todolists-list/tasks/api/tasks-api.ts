import { instance, ResponseType } from "../../../../common/api";
import {GetTasksResponseType, TaskModelType, TaskResponseType} from './tasks-api-types';


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
