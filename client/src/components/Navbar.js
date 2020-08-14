import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import Logo from '../assets/Logo.png';

const Navbar = ({ isAuthenticated }) => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const handleLogout = (e) => {
        e.preventDefault();
        auth.logout();
        history.push('/');
    }
   return (
       <nav>
        <div className="nav-wrapper">
            <a href="/" className="brand-logo">
                <img src={Logo} alt="LOGO_DUCK" className="duckLogo"/>
            </a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">CREATE</NavLink></li>
                    <li><NavLink to="/links">LINKS</NavLink></li>
                    <li><a href="/" onClick={handleLogout}>Logout</a></li>
                </ul>
        </div>
    </nav>
   )
};

export default Navbar;