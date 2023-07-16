import { instance, ResponseType } from "../../../../common/api";

export type TodolistResponseType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistResponseType>>(`/todo-lists`);
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistResponseType }>>("/todo-lists", { title });
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, { title });
    },
};
