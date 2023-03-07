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
        <>
            <br></br>
            <h1>Sign In</h1>
            <label>email</label>
            <input type="text" onChange={handleEmailInput}></input>
            <label>Password</label>
            <input type="text" onChange={handlePasswordInput}></input>
            <button onClick={handleSubmit}>Sign In</button>
            <p>{signInErrorMessage}</p>
        </>
    )
}

export default SignIn;