// import React, { Component } from 'react';
import React, { useState } from 'react';
import apiUrl from '../../src/apiConfig';
import axios from 'axios';

const SignUp = (props) => {
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

    const handleEmailInput = (e) => {
        setEmailInput(e.target.value)
    }

    const handlePasswordInput = (e) => {
        setPasswordInput(e.target.value)
    }

    const handleConfirmPasswordInput = (e) => {
        setConfirmPasswordInput(e.target.value)
    }

    const handleSubmit = () => {
        axios.post(`${apiUrl}/users/tokens/sign_up`, {
            "email": emailInput,
            "password": passwordInput,
            "password_confirmation": confirmPasswordInput
        })
        .then((response) => {
            props.userSignedIn(response)
        })
        .catch((error) => {
            setSignUpErrorMessage(error.response.data.error_description[0])
        })
    }

    return(
        <>
            <br></br>
            <h1>Sign Up</h1>
            <label>email</label>
            <input type="text" onChange={handleEmailInput}></input>
            <label>Password</label>
            <input type="text" onChange={handlePasswordInput}></input>
            <label>Confirm Password</label>
            <input type="text" onChange={handleConfirmPasswordInput}></input>
            <button onClick={handleSubmit}>Sign Up</button>
            <br></br>
            <p>{signUpErrorMessage}</p>
        </>
    )
}

export default SignUp;