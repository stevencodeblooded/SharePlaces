import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'

import "./Header.css";

const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isOpen, setIsOpen] = useState(false)

  const handleIsOpen = () => setIsOpen(!isOpen)
  const handleCloseMenu = () => setIsOpen(false)

  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true')
  }, [])

  return (
    <div className="header-container">
      <div className="header">
        <h2>
          <NavLink to='/' onClick={handleCloseMenu}>Share Places</NavLink>
        </h2>

        <FontAwesomeIcon icon={!isOpen ? faBars : faTimes} onClick={handleIsOpen} className="faTimes-faBars"/>

        <ul className={isOpen ? 'nav-items-mobile' : 'nav-items'}>
          <li>
            <NavLink to='/' className={({isActive}) => isActive ? 'active-link' : null} onClick={handleCloseMenu}>Users</NavLink>
          </li>

          {/* <li>
            <NavLink to={`3/places`} className={({isActive}) => isActive ? 'active-link' : null} onClick={handleCloseMenu} >My Places</NavLink>
          </li> */}

          <li>
            <NavLink to='places/NewPlace' className={({isActive}) => isActive ? 'active-link' : null} onClick={handleCloseMenu} >New Place</NavLink>
          </li>

          { !isLoggedIn ? (
          <li>
            <NavLink to='Authenticate' className={({isActive}) => isActive ? 'active-link' : null} onClick={handleCloseMenu}>Authenticate</NavLink>
          </li>
          ) : (
            <li>
              <NavLink onClick={handleLogOut}>Log Out</NavLink>
            </li>
          ) }

        </ul>

      </div>
    </div>
  );
};

export default Header;
