import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

class Forgot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            err: null,
            open:false
        };
    }
    handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value,
        });
    };
    reset = (e) => {
        e.preventDefault();
        let form = new FormData();
        form.append("email", this.state.email);
        axios.post("http://127.0.0.1:8000/api/forgot", form).then((response) => {
            if(response.data.success==1){
                this.setState({
                    open:true
                })
                console.log('dã gui mat khau moi')
            }
            else{
                this.setState({
                    err:response.data.errors
                })
            }
            
        });
    };
    render() {
        return (
            <div id="logreg-forms">
                <center>
                <form className="form-signin col-md-4" onSubmit={this.reset}>
                    <h1
                        className="h3 mb-3 font-weight-normal"
                        style={{ textAlign: "center" }}
                    >
                        Reset password
                    </h1>
                    
                    {this.state.err!=null && <Alert color="danger">{this.state.err.message}</Alert>}
                    <input
                        type="email"
                        name="email"
                        id="resetEmail"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Email address"
                    />
                    <br></br>
                    
                    {this.state.err!=null && <Alert color="danger">{this.state.err.email}</Alert>}
                    <button className="btn btn-success btn-block" type="submit">
                        Reset Password
                    </button>
                    <br></br>
                    <Link to='/'><button className="btn btn-success btn-block" type="submit">
                        Back
                    </button></Link>
                </form>
                </center>
                
            </div>
        );
    }
}

export default Forgot;