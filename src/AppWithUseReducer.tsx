import React, {Reducer, useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterlistAC,
    changeTodolistTitleAC,
    removeTodolistAC, TodolistsActionsType,
    todolistsReducer
} from './store/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActionsType,
    tasksReducer
} from './store/tasks-reducer';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = { id: string, title: string, filter: FilterValuesType }
export type TasksType = {
    [key: string]: Array<TaskType>
}

const TODOLIST_ID_1 = v1()
const TODOLIST_ID_2 = v1()

export function AppWithUseReducer() {
    const [todolistsState, todolistsDispatch] = useReducer<Reducer<Array<TodoListType>, TodolistsActionsType>>(todolistsReducer, [
        {id: TODOLIST_ID_1, title: 'What to learn', filter: 'all'},
        {id: TODOLIST_ID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasksState, tasksDispatch] = useReducer<Reducer<TasksType, TasksActionsType>>(tasksReducer, {
        [TODOLIST_ID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [TODOLIST_ID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Eggs', isDone: false},
            {id: v1(), title: 'Bread', isDone: true},
        ],
    })


    function addTodolist(title: string) {
        const action = addTodolistAC(title)

        todolistsDispatch(action)
        tasksDispatch(action)
    }
    function deleteTodolist(todolistID: string): void {
        const action = removeTodolistAC(todolistID)

        todolistsDispatch(action)
        tasksDispatch(action)
    }
    function changeTodolistTitle(todolistID: string, newTitle: string) { todolistsDispatch(changeTodolistTitleAC(todolistID, newTitle)) }
    function changeFilter(todolistID: string, value: FilterValuesType): void {
        todolistsDispatch(changeTodolistFilterlistAC(todolistID, value))
    }


    function addTask(todolistID: string, title: string): void { tasksDispatch(addTaskAC(todolistID, title)) }
    function removeTask(todolistID: string, taskId: string): void { tasksDispatch(removeTaskAC(todolistID, taskId)) }
    function changeStatus(todolistID:string,taskId:string,isDone:boolean):void {tasksDispatch(changeTaskStatusAC(todolistID, taskId, isDone))}
    function changeTaskTitle(todolistID: string, taskId: string, newTitle: string) {
        tasksDispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
    }


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        ToDoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container>
                <Grid container spacing={4} style={ {paddingTop: '30px'} }>
                    <Grid item xs={12} >
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    {
                        todolistsState.map(el => {

                            let tasksForTodolist = tasksState[el.id];
                            if (el.filter === 'active') {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                            } else if (el.filter === 'completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                            }

                            return (
                                <Grid item key={el.id}>
                                    <Paper elevation={2} style={{padding: '15px'}}>
                                        <Todolist id={el.id}
                                                  title={el.title}
                                                  tasks={tasksForTodolist}
                                                  removeTask={removeTask}
                                                  changeFilter={changeFilter}
                                                  addTask={addTask}
                                                  changeStatus={changeStatus}
                                                  filter={el.filter}
                                                  deleteTodolist={deleteTodolist}
                                                  changeTaskTitle={changeTaskTitle}
                                                  changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}