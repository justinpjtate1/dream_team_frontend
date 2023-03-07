import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import apiUrl from './apiConfig';
import axios from 'axios';

const App = (props) => {
  const [auth, setAuth] = useState(() => {
    if(localStorage.getItem("refresh_token")) {
      return true
    } else {
      return false
    }
  })

  // const [auth, setAuth] = useState(() => {
  //   const apiRequest = axios.post(`${apiUrl}/pages/user_logged_in`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
  //     }
  //   })
  //   .then((response) => {
  //     return true
  //   })
  //   .catch((error) => {
  //     return false
  //   })
  //   return apiRequest
  // })

  const userSignedIn = (response) => {
    localStorage.setItem("refresh_token", response.data.refresh_token);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("resource_owner_id", response.data.resource_owner.id);
    localStorage.setItem("resource_owner_email", response.data.resource_owner.email);
    setAuth(true)
  }

  const userSignedOut = () => {
    axios.post(`${apiUrl}/users/tokens/revoke`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
      }
    })
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("resource_owner_id");
    localStorage.removeItem("resource_owner_email");
    localStorage.removeItem("token");
    setAuth(false)
  }

  return(
    <div className='page'>
      <Router>
        <nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/" onClick={userSignedOut}>Sign Out</Link>
        </nav>
        <Routes>
          <Route path="/signup" element={auth !== true ? (<SignUp userSignedIn={userSignedIn} />) : (<Navigate replace to = {"/profile"} />)} />
          <Route path="/signin" element={auth !== true ? (<SignIn userSignedIn={userSignedIn} />) : (<Navigate replace to = {"/profile"} />)} />
          <Route path="/profile" element={auth === true ? (<Profile />) : (<Navigate replace to = {"/"} />)}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;