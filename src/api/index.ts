import axios from 'axios';

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    headers: {
        "API-KEY": "31f53cca-e0c7-46c1-88c3-71665c47f40c"
    }
})
