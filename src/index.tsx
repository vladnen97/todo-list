import React from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import {HashRouter} from 'react-router-dom';

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
);
