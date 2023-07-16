import {RootStateType} from '../../app/store';
import {TasksType} from '../../features/todolists-list/tasks/model/tasks-reducer';

export const selectTasks = (state: RootStateType): TasksType => state.tasks