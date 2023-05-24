import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    changeTodolistFilterlistAC,
    createTodolist,
    fetchTodolists,
    FilterValuesType,
    removeTodolist,
    TodoListType,
    updateTodolist,
} from './store/todolists-reducer';
import {
    createTask, deleteTask, TasksType, updateTask
} from './store/tasks-reducer';
import {useSelector} from 'react-redux';
import {RootStateType} from './store/store';
import {TaskStatuses} from './api/tasks-api';
import {useAppDispatch} from './hooks/hooks';


export function App() {
    const todolists = useSelector<RootStateType, Array<TodoListType>>((state) => state.todolists)
    const tasks = useSelector<RootStateType, TasksType>((state) => state.tasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolists())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [])
    const deleteTodolist = useCallback((todolistId: string): void => {
        dispatch(removeTodolist(todolistId))
    }, [])
    const changeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispatch(updateTodolist(todolistID, newTitle))
    }, [])
    const changeFilter = useCallback((todolistID: string, value: FilterValuesType): void => {
        dispatch(changeTodolistFilterlistAC(todolistID, value))
    }, [])


    const addTask = useCallback((todolistID: string, title: string): void => {
        dispatch(createTask(todolistID, title))
    }, [])
    const removeTask = useCallback((todolistID: string, taskId: string): void => {
        dispatch(deleteTask(todolistID, taskId))
    }, [])

    const changeStatus = useCallback((todolistID: string, taskId: string, status: TaskStatuses): void => {
        dispatch(updateTask(todolistID, taskId, {status}))
    }, [])
    const changeTaskTitle = useCallback((todolistID: string, taskId: string, title: string) => {
        dispatch(updateTask(todolistID, taskId, {title}))
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