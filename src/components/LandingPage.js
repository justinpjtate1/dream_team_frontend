import background from "../player-background.jpeg"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Navigate
  } from 'react-router-dom';

const LandingPage = () => {
    return(
        <div className="index-page">
            <div className="index-background"> </div>
            <div className="index-items">
                <h1 id="test">Dream Team</h1>
                <Link to="/signup" className='index-link'>Sign Up</Link>
                <Link to="/signin"className='index-link'>Sign In</Link>
            </div>
            
        </div>
        
        
    )
}

export default LandingPage