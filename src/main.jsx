/*
 * @Date: 2023-05-17 17:19:42
 * @LastEditors: okzfans
 * @LastEditTime: 2023-05-22 18:35:34
 * @Description: nothing
 * Copyright (c) 2023 by okzfans, All Rights Reserved.
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import App from './App'
import './index.css'
import 'lib-flexible/flexible'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
)
