import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../../Components/utils/AuthContext";

import "./Header.css";

const Header = () => {

  const [isOpen, setIsOpen] = useState(false)
  const auth = useAuth()

  const handleIsOpen = () => setIsOpen(!isOpen)
  const handleCloseMenu = () => setIsOpen(false)

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

          <li>
            <NavLink to='places/NewPlace' className={({isActive}) => isActive ? 'active-link' : null} onClick={handleCloseMenu} >New Place</NavLink>
          </li>

          { !auth.user ? (
          <li>
            <NavLink to='Authenticate' className={({isActive}) => isActive ? 'active-link' : null} onClick={handleCloseMenu}>Authenticate</NavLink>
          </li>
          ) : (
            <li>
              <NavLink onClick={auth.logout}>Log Out</NavLink>
            </li>
          ) }

        </ul>

      </div>
    </div>
  );
};

export default Header;
