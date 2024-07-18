import React from 'react';

import logo from '../assets/logo.png';

import './header.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">{/* <img src={logo} alt="Company logo" /> */}</div>
      <div className="nav__department" style={{ width: '60px', height: '52px' }}>
        <svg width="60" height="52" viewBox="0 0 65 63" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33.8334 49.5205H31.1667C30.062 49.5205 29.1667 48.5585 29.1667 47.3716V40.9246C29.1667 39.7377 30.062 38.7756 31.1667 38.7756H33.8334C34.938 38.7756 35.8334 39.7377 35.8334 40.9246V47.3716C35.8334 48.5585 34.938 49.5205 33.8334 49.5205Z"
            fill="white"
            stroke="white"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M2.5 22.6582L32.5 2.95923L62.5 22.6582"
            stroke="white"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M55.8333 35.1938V58.1163C55.8333 59.3032 54.938 60.2653 53.8333 60.2653H11.1666C10.0621 60.2653 9.16663 59.3032 9.16663 58.1163V35.1938"
            stroke="white"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};
