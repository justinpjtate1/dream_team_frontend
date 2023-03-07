import React, { Component } from 'react';
import apiUrl from '../../src/apiConfig';
import axios from 'axios';

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emailInput: "",
            passwordInput: "",
            confirmPasswordInput: "",
            signUpErrorMessage: ""
        }
    }

    handleEmailInput = (e) => {
        this.setState({
            emailInput: e.target.value
        })
    }

    handlePasswordInput = (e) => {
        this.setState({
            passwordInput: e.target.value
        })
    }

    handleConfirmPasswordInput = (e) => {
        this.setState({
            confirmPasswordInput: e.target.value
        })
    }

    handleSubmit = () => {
        axios.post(`${apiUrl}/users/tokens/sign_up`, {
            "email": this.state.emailInput,
            "password": this.state.passwordInput,
            "password_confirmation": this.state.confirmPasswordInput
        })
        .then((response) => {
            localStorage.setItem("refresh_token", response.data.refresh_token);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("resource_owner_id", response.data.resource_owner.id);
            localStorage.setItem("resource_owner_email", response.data.resource_owner.email);
        })
        .catch((error) => {
            this.setState({
                signUpErrorMessage: error.response.data.error_description[0]
            })
        })
    }

    render() {
        return(
            <>
                <br></br>
                <h1>Sign Up</h1>
                <label>email</label>
                <input type="text" onChange={this.handleEmailInput}></input>
                <label>Password</label>
                <input type="text" onChange={this.handlePasswordInput}></input>
                <label>Confirm Password</label>
                <input type="text" onChange={this.handleConfirmPasswordInput}></input>
                <button onClick={this.handleSubmit}>Sign Up</button>
            </>
        )
    }
}

export default SignUp;