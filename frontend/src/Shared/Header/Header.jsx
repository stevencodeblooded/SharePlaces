import React from "react";

import { NavLink } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <div className="header">
        <h2>
          <NavLink to='/'>Share Places</NavLink>
        </h2>
        <ul className="nav-items">
          <li>
            <NavLink to='/' className={({isActive}) => isActive ? 'active-link' : null}>Users</NavLink>
          </li>
          <li>
            <NavLink to='Authenticate' className={({isActive}) => isActive ? 'active-link' : null}>Authenticate</NavLink>
          </li>
          <li>
            <NavLink to='places/NewPlace' className={({isActive}) => isActive ? 'active-link' : null} >New Place</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
