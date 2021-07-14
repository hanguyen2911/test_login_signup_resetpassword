import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { post } from "jquery";
import cookie from "react-cookies";
import { Link } from "react-router-dom";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Alert,
} from "reactstrap"; 

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            err: null,
            message: null,
        };
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        });
    };
    login = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("email", this.state.email);
        form.append("password", this.state.password);
        axios.post("http://127.0.0.1:8000/api/login", form).then((reponse) => {
            console.log(reponse.data);
            if (reponse.data.success == 1) {
                cookie.save("user", reponse.data.user);
                alert("Login success!");
                window.location.href = "http://localhost:8000/";
            } else {
                this.setState({
                    err: reponse.data.errors,
                });
            }
        });
    };
    watchPassword = () => {
        var y = document.getElementById("password");
        if (y.type === "password") {
            y.type = "text";
        } else {
            y.type = "password";
        }
    };
    render() {
        return (
            <div id="logreg-forms">
                <form className="form-signin" onSubmit={this.login}>
                    <h1
                        className="h3 mb-3 font-weight-normal"
                        style={{ textAlign: "center" }}
                    >
                        <b>Đăng nhập</b>
                    </h1>
                    {this.state.err != null && (
                        <Alert color="warning">{this.state.err.login}</Alert>
                    )}
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            id="inputEmail"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Email address"
                            required=""
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span className="text-danger">{this.state.err.email}</span>
                    )}
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required=""
                        />
                    </div>
                    {this.state.err != null && (
                        <span className="text-danger">
                            {this.state.err.password}
                        </span>
                    )}
                    <br />
                    <input type="checkbox" onClick={this.watchPassword} />
                    Show Password
                    <br />
                 
                        <button
                            className="btn btn-md btn-rounded btn-block form-control submit btn-primary"
                            type="submit"
                        >
                            <i className="fas fa-sign-in-alt"></i> Sign in
                        </button>
                   
                    <Link to="/forgot">Forgot password</Link>
                    <hr />
                </form>
            </div>
        );
    }
}

export default Login;
