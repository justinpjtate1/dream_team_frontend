// import React, { Component } from 'react';
import React, { useState } from 'react';
import apiUrl from '../../src/apiConfig';
import axios from 'axios';

const SignIn = (props) => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [signInErrorMessage, setSignInErrorMessage] = useState("");

    const handleEmailInput = (e) => {
        setEmailInput(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value)
    }

    const handleSubmit = () => {
        axios.post(`${apiUrl}/users/tokens/sign_in`, {
            "email": emailInput,
            "password": passwordInput
        })
        .then((response) => {
            props.userSignedIn(response)
        })
        .catch((error) => {
            setSignInErrorMessage(error.response.data.error_description[0])
        })
    }

    return(
        <div className="index-page">
            <div className="index-background"> </div>
            <div className="index-items" id="sign-up">
                <h1>Sign In</h1>
                <input type="text" placeholder="email" onChange={handleEmailInput}></input>
                <input type="text" placeholder="password" onChange={handlePasswordInput}></input>
                <button onClick={handleSubmit}>Sign In</button>
                <p>{signInErrorMessage}</p>
            </div>
            
        </div>
    )
}

export default SignIn;