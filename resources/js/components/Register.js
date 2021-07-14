import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { post } from "jquery";
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

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            address: "",
            phone: "",
            password: "",
            confirm_password: "",
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
    watchPassword = () => {
        var x = document.getElementById("confirm");
        var y = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            y.type = "text";
        } else {
            x.type = "password";
            y.type = "password";
        }
    };
    register = (e) => {
        e.preventDefault();
        if (this.state.password != this.state.confirm_password) {
            let error = {
                confirm: "Password does not match!",
            };
            this.setState({
                err: error,
            });
        } else {
            this.setState({
                err: null,
            });
            let form = new FormData();
            form.append("email", this.state.email);
            form.append("username", this.state.username);
            form.append("phone", this.state.phone);
            form.append("password", this.state.password);
            form.append("address", this.state.address);
            axios
                .post("http://127.0.0.1:8000/api/register", form)
                .then((reponse) => {
                    if (reponse.data.success == 1) {
                        alert("Register success!");
                        window.location.href = "http://localhost:8000/";
                    }
                    this.setState({
                        err: reponse.data.errors,
                    });
                });
        }
    };
    render() {
        return (
            <div id="logreg-forms">
                <form onSubmit={this.register}>
                    <h1
                        className="h3 mb-3 font-weight-normal"
                        style={{ textAlign: "center" }}
                    >
                       <b>Đăng ký</b>
                    </h1>
                    {this.state.err != null && (
                        <Alert color="danger">{this.state.err.register}</Alert>
                    )}
                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            id="inputEmail"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Email address"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span className="text-danger">{this.state.err.email}</span>
                    )}
                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Full name"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span className="text-danger">
                            {this.state.err.username}
                        </span>
                    )}
                    <div className="input-group">
                        <input
                            type="text"
                            name="address"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Address"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span className="text-danger">
                            {this.state.err.address}
                        </span>
                    )}
                    <div className="input-group">
                        <input
                            type="phone"
                            name="phone"
                            className="form-control"
                            onChange={this.handleChange}
                            placeholder="Phone"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span className="text-danger">{this.state.err.phone}</span>
                    )}
                    <div className="input-group">
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            id="password"
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <br />
                    {this.state.err != null && (
                        <span className="text-danger">
                            {this.state.err.password}
                        </span>
                    )}
                    <input
                        type="password"
                        id="confirm"
                        name="confirm_password"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Confirm Password"
                    />
                    <br />
                    {this.state.err != null && (
                        <span className="text-danger">
                            {this.state.err.confirm}
                        </span>
                    )}
                    <br />
                    <input type="checkbox" onClick={this.watchPassword} />
                    Show Password
                    <div className="input-group">
                        <button
                            className="btn btn-md btn-block submit btn-secondary"
                            type="submit"
                        >
                            <i className="fas fa-user-plus"></i> Đăng ký
                        </button>
                    </div>
                    <Link to="/">Back</Link>
                </form>
            </div>
        );
    }
}

export default Register;
