import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {
    addTodolistAC,
    changeTodolistFilterlistAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from './store/todolists-reducer';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
} from './store/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './store/store';


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


export function AppWithRedux() {
    const todolists = useSelector<RootStateType, Array<TodoListType>>((state) => state.todolists)
    const tasks     = useSelector<RootStateType, TasksType>((state) => state.tasks)

    const dispatch = useDispatch()

    function addTodolist(title: string) { dispatch(addTodolistAC(title)) }
    function deleteTodolist(todolistID: string): void { dispatch(removeTodolistAC(todolistID)) }
    function changeTodolistTitle(todolistID: string, newTitle: string) { dispatch(changeTodolistTitleAC(todolistID, newTitle)) }
    function changeFilter(todolistID: string, value: FilterValuesType): void {
        dispatch(changeTodolistFilterlistAC(todolistID, value))
    }


    function addTask(todolistID: string, title: string): void { dispatch(addTaskAC(todolistID, title)) }
    function removeTask(todolistID: string, taskId: string): void { dispatch(removeTaskAC(todolistID, taskId)) }
    function changeStatus(todolistID:string,taskId:string,isDone:boolean):void {dispatch(changeTaskStatusAC(todolistID, taskId, isDone))}
    function changeTaskTitle(todolistID: string, taskId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(todolistID, taskId, newTitle))
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
                        todolists.map(el => {

                            let tasksForTodolist = tasks[el.id];
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