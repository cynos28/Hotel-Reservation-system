import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import { Provider } from "react-redux";
import { store } from "./redux/features/store";

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      
        <App />
     
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
