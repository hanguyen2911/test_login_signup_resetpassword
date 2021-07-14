import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashboard extends Component {
    render() {
        return (
            <div className="container" >
                <Link to={"/login"} className="btn">           
                   <b>LOGIN</b>
                </Link>
                <Link to={"/register"} className="btn">           
                    <b>SIGNUP</b>
                </Link>
                
            </div>
        );
    }
}

export default Dashboard;
