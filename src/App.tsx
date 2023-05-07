import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterlistAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodoListType,
} from './store/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC, TasksType,
} from './store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './store/store';
import {TaskStatuses} from './api/tasks-api';


export function App() {
    const todolists = useSelector<RootStateType, Array<TodoListType>>((state) => state.todolists)
    const tasks = useSelector<RootStateType, TasksType>((state) => state.tasks)

    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])
    const deleteTodolist = useCallback((todolistID: string): void => {
        dispatch(removeTodolistAC(todolistID))
    }, [])
    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistID, newTitle))
    }, [])
    const changeFilter = useCallback((todolistID: string, value: FilterValuesType): void => {
        dispatch(changeTodolistFilterlistAC(todolistID, value))
    }, [])


    const addTask = useCallback((todolistID: string, title: string): void => {
        dispatch(addTaskAC(todolistID, title))
    }, [])
    const removeTask = useCallback((todolistID: string, taskId: string): void => {
        dispatch(removeTaskAC(todolistID, taskId))
    }, [])
    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses): void => {
        dispatch(changeTaskStatusAC(todolistID, taskId, status))
    }, [])
    const changeTaskTitle = useCallback((todolistID: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
    }, [])


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
                <Grid container spacing={4} style={{paddingTop: '30px'}}>
                    <Grid item xs={12}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    {
                        todolists.map(el => (
                                <Grid item key={el.id}>
                                    <Paper elevation={2} style={{padding: '15px'}}>
                                        <Todolist id={el.id}
                                                  title={el.title}
                                                  tasks={tasks[el.id]}
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
                        )
                    }
                </Grid>
            </Container>
        </div>
    );
}