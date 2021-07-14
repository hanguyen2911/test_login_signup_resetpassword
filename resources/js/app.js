/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

import React from "react";
import ReactDOM from "react-dom";
import Register from './components/Register';
import Login from './components/Login';
import Forgot from "./components/Forgot";
import Dashboard from './components/Dashboard';
import  "bootstrap/dist/css/bootstrap.css";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom';
function App() {
    return (
        <Router>
            <div className="container">
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route path="/forgot">
                        <Forgot />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}
export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
