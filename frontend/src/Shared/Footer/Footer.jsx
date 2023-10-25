import React from 'react'

import { Link } from 'react-router-dom'

import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <div className='footer'>
      <p>Copyright @sharespacesonline</p>

      <div className='footer-lower-elements'>
        <section className='privacy-terms'>
          <Link className='privacy-link' to='privacy-terms'>Privacy & Terms</Link>
        </section>
        <section className='socials-container'>
          <ul className='socials-list'>
            <li>
              <a href="http://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} className='icon-social' />
              </a>
            </li>
            <li>
              <a href="http://facebook.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faSquareFacebook} className='icon-social' />
              </a>
            </li>
            <li>
              <a href="http://twitter.com" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faSquareXTwitter} className='icon-social' />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Footer