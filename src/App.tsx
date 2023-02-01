import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

function App() {

    const title1 = 'What to learn';
    const title2 = 'What to watch';

    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
    ]
    const tasks2 = [
        { id: 1, title: "FMJ", isDone: true },
        { id: 2, title: "Dune", isDone: true },
        { id: 3, title: "Mad Max", isDone: true }
    ]

    return (
        <div className="App">
            <Todolist title={title1} tasks={tasks1}/>
            <Todolist title={title2} tasks={tasks2}/>
        </div>
    );
}

export default App;
