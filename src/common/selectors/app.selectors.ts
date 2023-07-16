import {RootStateType} from '../../app/store';
import {RequestStatusType} from '../../app/app-reducer';

export const selectStatus = (state: RootStateType): RequestStatusType => state.app.status
export const selectIsInitialized = (state: RootStateType): boolean => state.app.isInitialized
export const selectError = (state: RootStateType): string | null => state.app.error