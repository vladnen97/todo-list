import {AppDispatchType} from '../../app/store';
import axios, {AxiosError} from 'axios';
import {appActions} from '../../app/app-reducer';

export const handleServerNetworkError = (dispatch: AppDispatchType, e: unknown): void => {
    const err = e as Error | AxiosError<{ error: string }>
    if (axios.isAxiosError(err)) {
        dispatch(appActions.setAppError({error: err.response?.data.message || err.message || "Some error occurred"}));
    } else {
        dispatch(appActions.setAppError({error: `Native error ${err.message}`}));
    }
}