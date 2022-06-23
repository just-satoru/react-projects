import React from 'react';
import './header.scss';
import logo from '../../logo.png';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="navigation">
          <div className="logo">
            <img src={logo} alt="" />
            Agency
          </div>
          <div className="menu">
            <ul>
              <li>About</li>
              <li>Services</li>
              <li>Pricing</li>
              <li>Blog</li>
            </ul>
          </div>
          <div className="contact">
            <a href="">Contact</a>
          </div>
        </div>
        <div className="header-title">
          <h1>Portfolio</h1>
          <p>Agency provides a full service range including technical skills, design, business understanding.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;