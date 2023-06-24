import {RootStateType} from '../../store/store';

export const selectIsLoggedIn = (state: RootStateType): boolean => state.auth.isLoggedIn