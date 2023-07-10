import { AnyAction, combineReducers } from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";
import { ThunkDispatch } from "redux-thunk";
import { appReducer } from "./app-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth-reducer";

const RootState = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
});
export const store = configureStore({
    reducer: RootState,
});

export type RootStateType = ReturnType<typeof RootState>;
export type AppDispatchType = ThunkDispatch<RootStateType, unknown, AnyAction>;

//@ts-ignore
window.store = store;
