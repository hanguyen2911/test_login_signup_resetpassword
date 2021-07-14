import React from "react";
import ReactDOM from "react-dom";
import Register from './Register.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';
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
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </div>
        </Router>
    );
}
export default App;

if (document.getElementById("app")) {
    ReactDOM.render(<App />, document.getElementById("app"));
}
