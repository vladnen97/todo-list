import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import {ResponseType} from '../../api';
import {appActions} from '../../store/app-reducer';
import {handleServerNetworkError} from './handle-server-network-error';
import {AppDispatchType, RootStateType} from '../../store/store';

export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<RootStateType, any, AppDispatchType, null | ResponseType>,
    logic: Function) => {
    const {dispatch, rejectWithValue} = thunkAPI

    dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    } finally {
        // в handleServerNetworkError можно удалить убирание крутилки
        dispatch(appActions.setAppStatus({status: 'idle'}))
    }
}