import './Footer.css';

import snapchat from '../../assets/icons/Snapchat.png';
import instagram from '../../assets/icons/Instagram.png';
import facebook from '../../assets/icons/Facebook.png';
import tiktok from '../../assets/icons/Tik tok.png';

import samoaFlag from '../../assets/flags/sa.png';
import fijiFlag  from '../../assets/flags/fi.png';
import tongaFlag from '../../assets/flags/to.png';

import React from 'react'

const Footer = () => {
  return (
     <footer className="footer">
      <div className="footer__row footer__row--social">
        <a href="https://snapchat.com"   target="_blank" rel="noopener noreferrer"><img src={snapchat}  alt="Snapchat" /></a>
        <a href="https://instagram.com"  target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram" /></a>
        <a href="https://facebook.com"   target="_blank" rel="noopener noreferrer"><img src={facebook}  alt="Facebook" /></a>
        <a href="https://tiktok.com"     target="_blank" rel="noopener noreferrer"><img src={tiktok}    alt="TikTok" /></a>
      </div>

      <div className="footer__row footer__row--flags">
        <img src={samoaFlag} alt="Samoa flag" />
        <img src={fijiFlag}  alt="Fiji flag"  />
        <img src={tongaFlag} alt="Tonga flag" />
      </div>

      <div className="footer__row footer__row--text">
        ©Pasifika Hub — All rights reserved
      </div>
    </footer>
  )
}

export default Footer