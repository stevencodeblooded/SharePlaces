import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faTimes} from '@fortawesome/free-solid-svg-icons'
import { useAuth } from "../../Components/utils/AuthContext";

import "./Header.css";

const Header = () => {

  const [userClicked, setUserClicked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const auth = useAuth()
  const user = auth.user

  let userImage 
  try {
    userImage = user.user.image
  } catch (error) {
    
  }

  let uid
  try {
    uid = user.user.id
  } catch (error) {
  }

  const handleIsOpen = () => setIsOpen(!isOpen)
  const handleCloseMenu = () => setIsOpen(false)
  const handleUserState = () => setUserClicked(!userClicked)
  const handleLogOut = () => {
    auth.logout()
    setIsOpen(false)
    setUserClicked(false)
  }

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
          
          { auth.user && (
          <li>
            <NavLink to={`${uid}/Places`} className={({isActive}) => isActive ? 'active-link' : null} onClick={handleCloseMenu} >My Places</NavLink>
          </li>
          )}

          { !auth.user ? (
          <li>
            <NavLink to='Authenticate' className={({isActive}) => isActive ? 'active-link' : null} onClick={handleCloseMenu}>Authenticate</NavLink>
          </li>
          ) : (
            <li>
              <NavLink>
                <div>
                  <img src={`http://localhost:5000/assets/${userImage}`} 
                      alt="Profile" 
                      className="nav-user-profile"
                      onClick={handleUserState}
                  />
                </div>
              </NavLink>
              {userClicked && (
                <div className="user-data-nav">
                  <p className="logout-nav" onClick={handleLogOut}>Log Out</p>
                </div>
              )}
            </li>
          ) }

        </ul>

      </div>
    </div>
  );
};

export default Header;
