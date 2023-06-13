import {setAppError, setAppStatus} from '../store/app-reducer';
import {AppDispatchType} from '../store/store';
import {ResponseType} from '../api';

export const handleServerAppError = <D>(dispatch: AppDispatchType, res: ResponseType<D>) => {
    dispatch(setAppError(res.messages[0]))
    dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (dispatch: AppDispatchType, err: any) => {
    dispatch(setAppError(err.response?.data?.message || err.message || 'Some error occurred'))
    dispatch(setAppStatus('failed'))
}
