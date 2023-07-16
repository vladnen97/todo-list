import { AppDispatchType } from '../../app/store'
import { ResponseType } from '../api'
import { appActions } from '../../app/app-reducer'

/**
 * Данная функция обрабатывает ошибки, которые могут возникнуть при взаимодействии с сервером.
 * @param data  - ответ от сервера в формате ResponseType<D>
 * @param dispatch - функция для отправки сообщений в store Redux
 * @param showError - флаг, указывающий, нужно ли отображать ошибки в пользовательском интерфейсе
 */

export const handleServerAppError = <D>(dispatch: AppDispatchType, data: ResponseType<D>, showError: boolean = true): void => {
    if (showError) {
        dispatch(appActions.setAppError({ error: data.messages[0] }))
    }
}