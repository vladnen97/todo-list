import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import {handleServerNetworkError} from './handle-server-network-error';
import {AppDispatchType, RootStateType} from '../../app/store';

export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<RootStateType, any, AppDispatchType, unknown>,
    logic: Function) => {
    const {dispatch, rejectWithValue} = thunkAPI

    try {
        return await logic()
    } catch (e) {
        handleServerNetworkError(dispatch, e)
        return rejectWithValue(null)
    }
}