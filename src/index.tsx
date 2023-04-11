import React from 'react';
import './index.css';
import {createRoot} from 'react-dom/client';
import {AppWithRedux} from './AppWithRedux';
import {Provider} from 'react-redux';
import {store} from './store/store';

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <AppWithRedux/>
    </Provider>
);



