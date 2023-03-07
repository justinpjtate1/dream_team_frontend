import React, { Component } from 'react';
import apiUrl from '../../src/apiConfig';
import axios from 'axios';

class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            emailInput: "",
            passwordInput: "",
            signInErrorMessage: ""
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

    handleSubmit = () => {
        axios.post(`${apiUrl}/users/tokens/sign_in`, {
            "email": this.state.emailInput,
            "password": this.state.passwordInput
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
                <h1>Sign In</h1>
                <label>email</label>
                <input type="text" onChange={this.handleEmailInput}></input>
                <label>Password</label>
                <input type="text" onChange={this.handlePasswordInput}></input>
                <button onClick={this.handleSubmit}>Sign In</button>
            </>
        )
    }
}

export default SignIn;