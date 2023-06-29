import { AppDispatchType } from "../store/store";
import { ResponseType } from "../api";
import {appActions} from '../store/app-reducer';
import axios, {AxiosError} from 'axios';

export const handleServerAppError = <D>(dispatch: AppDispatchType, res: ResponseType<D>): void => {
    dispatch(appActions.setAppError({error: res.messages[0]}));
    dispatch(appActions.setAppStatus({status: "failed"}));
};

export const handleServerNetworkError = (dispatch: AppDispatchType, e: unknown): void => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        dispatch(appActions.setAppError({error: err.response?.data.message || err.message || "Some error occurred"}));
    } else {
        dispatch(appActions.setAppError({error: `Native error ${err.message}`}));
    }
    dispatch(appActions.setAppStatus({status: "failed"}));
};
