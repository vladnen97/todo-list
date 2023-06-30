import {RootStateType} from '../../store/store';
import {TasksType} from '../../store/tasks-reducer';

export const selectTasks = (state: RootStateType): TasksType => state.tasks