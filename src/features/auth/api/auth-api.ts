import { instance, ResponseType } from "../../../common/api";

export interface LoginParamsType {
    email: string;
    password: string;
    rememberMe: boolean;
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<{ id: number; email: string; login: string }>>("/auth/me");
    },
    login(params: LoginParamsType) {
        return instance.post<ResponseType<{ userId: number }>>("/auth/login", params);
    },
    logout() {
        return instance.delete<ResponseType>("/auth/login");
    },
};
