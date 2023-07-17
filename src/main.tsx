import React from 'react'
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom";
import { Provider } from 'react-redux'
import App from "./App.tsx";
import store from './store/index.ts'

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
