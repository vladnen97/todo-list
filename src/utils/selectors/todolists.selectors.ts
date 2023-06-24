import {RootStateType} from '../../store/store';
import {TodolistType} from '../../store/todolists-reducer';

export const selectTodolists = (state: RootStateType):  TodolistType[] => state.todolists