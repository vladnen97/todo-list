import {AppDispatchType} from '../../store/store';
import {ResponseType} from '../../api';
import {appActions} from '../../store/app-reducer';

export const handleServerAppError = <D>(dispatch: AppDispatchType, res: ResponseType<D>): void => {
    dispatch(appActions.setAppError({error: res.messages[0]}));
    dispatch(appActions.setAppStatus({status: "failed"}));
};