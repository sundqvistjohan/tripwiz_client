import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from "axios";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import rootReducer from './state/reducers/rootReducer'

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

const store = createStore(rootReducer);

window.store = store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
