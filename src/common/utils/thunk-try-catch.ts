import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import {AppDispatchType, RootStateType} from '../../app/store';
import {AxiosError} from 'axios';

export const thunkTryCatch = async (
    thunkAPI: BaseThunkAPI<RootStateType, any, AppDispatchType, unknown>,
    logic: Function) => {
    const {rejectWithValue} = thunkAPI

    try {
        return await logic()
    } catch (e) {
        const err = e as Error | AxiosError<{ error: string }>
        return rejectWithValue({data: err.message})
    }
}