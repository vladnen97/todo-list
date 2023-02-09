import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed' | 'three';
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);

    function changeChecked(id: string) {
        let changedTasks = tasks.map(task => task.id === id ? {...task, isDone: !task.isDone} : task);
        setTasks(changedTasks);
    }
    function removeTask(id: string): void {
        setTasks(tasks.filter(t => t.id !== id));
    }
    function addTask(task: string): void {
        let newTask: TaskType = {id: v1(), title: task, isDone: false};
        setTasks([newTask, ...tasks]);
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeChecked={changeChecked}/>
        </div>
    );
}

export default App;

