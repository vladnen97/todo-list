import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';


export type FilterValuesType = "all" | "active" | "completed";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function App() {
    let [filter, setFilter] = useState<FilterValuesType>("all");
    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);

    function removeTask(id: string): void {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }
    function addTask(title: string): void {
        let task = { id: v1(), title: title, isDone: false };
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }
    function changeFilter(value: FilterValuesType): void {
        setFilter(value);
    }
    function changeStatus(taskId: string, isDone: boolean): void {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: isDone} : t));
    }

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}/>
        </div>
    );
}





























//-------------------------------------------------------------------------------------------------------
//
// export type FilterValuesType = "all" | "active" | "completed";
//
// function App() {
//
//     let [tasks, setTasks] = useState([
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ]);
//
//     function removeTask(id: string) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     function addTask(title: string) {
//         let task = {id: v1(), title: title, isDone: false};
//         let newTasks = [task, ...tasks];
//         setTasks(newTasks);
//     }
//
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//     let tasksForTodolist = tasks;
//
//     if (filter === "active") {
//         tasksForTodolist = tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//
//     return (
//         <div className="App">
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}>
//                 <div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                     <div>Many intresting information</div>
//                 </div>
//             </Todolist>
//
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}>
//                 <div>
//                     <div>A lot of boring information</div>
//                     <div>A lot of boring information</div>
//                     <div>A lot of boring information</div>
//                     <input placeholder={'A lot of boring information'}/>
//                     <div>
//                         <button>Boring Button 1</button>
//                         <button>Boring Button 2</button>
//                         <button>Boring Button 3</button>
//                     </div>
//                 </div>
//             </Todolist>
//
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}/>
//         </div>
//     );
// }
//
// export default App;