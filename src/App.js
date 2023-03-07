import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import apiUrl from './apiConfig';

class App extends Component {
  render() {
    return(
      <div className='page'>
        <Router>
          <nav>
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </nav>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;