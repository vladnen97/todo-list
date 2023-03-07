import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';


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

export function App() {
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: TODOLIST_ID_1, title: 'What to learn', filter: 'all'},
        {id: TODOLIST_ID_2, title: 'What to buy', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<TasksType>({
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
        const newTodolist: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all',
        }
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({...tasks, [newTodolist.id]: []});
    }
    function deleteTodolist(todolistID: string): void {
        setTodoLists(todoLists.filter(el => el.id !== todolistID));
        const tasksCopy = {...tasks};
        delete tasksCopy[todolistID];
        setTasks(tasksCopy);
    }
    function changeTodolistTitle(todolistID: string, newTitle: string) {
        const trimmedNewTitle = newTitle.trim()
        setTodoLists(todoLists.map(el => el.id === todolistID && trimmedNewTitle !== '' ? {...el, title: trimmedNewTitle} : el));
    }
    function changeFilter(todolistID: string, value: FilterValuesType): void {
        setTodoLists(todoLists.map(el => el.id === todolistID ? {...el, filter:value} : el))
    }

    function addTask(todolistID: string, title: string): void {
        const newTasks = [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]];
        setTasks({...tasks, [todolistID]: newTasks});
    }
    function removeTask(todolistID: string,taksId: string): void {
        const filteredTasks = tasks[todolistID].filter(el => el.id !== taksId);
        setTasks({...tasks, [todolistID]: filteredTasks});
    }
    function changeStatus(todolistID: string, taskId: string, isDone: boolean): void {
        const darova = tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        setTasks({...tasks, [todolistID]: darova})
    }
    function changeTaskTitle(todolistID: string, taskId: string, newTitle: string) {
        const trimmedNewTitle = newTitle.trim()
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId && trimmedNewTitle !== '' ? {...el, title: trimmedNewTitle} : el)})
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>

            {
                todoLists.map(el => {

                    let tasksForTodolist = tasks[el.id];
                    if (el.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    } else if (el.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }

                    return (
                        <Todolist key={el.id}
                                  id={el.id}
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
                    )
                })
            }
        </div>
    );
}