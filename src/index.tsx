import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from "./pages/App";
import {store} from "./store/redux";
import {Provider} from "react-redux";


const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(<Provider store={store}><App/> </Provider>);