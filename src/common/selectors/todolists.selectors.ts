import {RootStateType} from '../../app/store';
import {TodolistType} from '../../features/todolists-list/todolists/model/todolists-reducer';

export const selectTodolists = (state: RootStateType):  TodolistType[] => state.todolists