import React from "react";
import {Link} from "react-router-dom";
const Navigation=({userObj})=>{
    return(
        <nav>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{userObj.displayName}My Profile</Link>
            </li>
        </nav>
    )
}

export default Navigation;