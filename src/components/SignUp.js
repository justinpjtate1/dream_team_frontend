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
        <div className="index-page">
            <div className="index-background"> </div>
            <div className="index-items" id="sign-up">
                <h1>Sign Up</h1>
                <input type="text" placeholder="Email" onChange={handleEmailInput}></input>
                <input type="text" placeholder="Password" onChange={handlePasswordInput}></input>
                <input type="text" placeholder="Confirm Password"onChange={handleConfirmPasswordInput}></input>
                <button onClick={handleSubmit}>Sign Up</button>
                <p>{signUpErrorMessage}</p>
            </div>
            
        </div>
    )
}

export default SignUp;