import React, { useEffect, useState } from 'react'
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
import LandingPage from './components/LandingPage';
import CreateDreamTeamPage from './components/CreateDreamTeamPage';
import ViewDreamTeamPage from './components/ViewDreamTeamPage';

const App = (props) => {
  const [auth, setAuth] = useState(() => {
    if(localStorage.getItem("refresh_token")) {
      return true
    } else {
      return false
    }
  })

  useEffect(() => {
    if(auth === true) {
      axios.get(`${apiUrl}/pages/user_logged_in`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('refresh_token')}`
        }
      })
      .catch((error) => {
        userSignedOut()
        setAuth(false)
      })
    }
  })

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
        {auth !== true ? (<nav>
          <Link to="/signup">Sign Up</Link>
          <Link to="/signin">Sign In</Link>
        </nav>) : (<nav>
          <Link to="/profile">Profile</Link>
          <Link to="/create">Create a Team</Link>
          <Link to="/view">View Teams</Link>
          <Link to="/" onClick={userSignedOut}>Sign Out</Link>
        </nav>)}
        <Routes>
          <Route path="/signup" element={auth !== true ? (<SignUp userSignedIn={userSignedIn} />) : (<Navigate replace to = {"/profile"} />)} />
          <Route path="/signin" element={auth !== true ? (<SignIn userSignedIn={userSignedIn} />) : (<Navigate replace to = {"/profile"} />)} />
          <Route path="/profile" element={auth === true ? (<Profile />) : (<Navigate replace to = {"/"} />)}/>
          <Route path="/create" element={auth === true ? (<CreateDreamTeamPage />) : (<Navigate replace to = {"/"} />)}/>
          <Route path="/view" element={auth === true ? (<ViewDreamTeamPage />) : (<Navigate replace to = {"/"} />)}/>
          <Route path="/" element={auth !== true ? (<LandingPage />) : (<Navigate replace to = {"/profile"} />)} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;