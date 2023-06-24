import {RootStateType} from '../../store/store';
import {RequestStatusType} from '../../store/app-reducer';

export const selectStatus = (state: RootStateType): RequestStatusType => state.app.status
export const selectIsInitialized = (state: RootStateType): boolean => state.app.isInitialized
export const selectError = (state: RootStateType): string | null => state.app.error