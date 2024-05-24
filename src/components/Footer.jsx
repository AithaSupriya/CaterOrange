import React from 'react'
import { Link } from 'react-router-dom';
import playstore from '../images/google.png'
import '../styles/Footer.css'


export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo(0, 0);
  };


  return (

    <div className='footer-main'>
      <div className='footer-top'>
        <div className='footer-top-1'>
          <span>DOWNLOAD OUR APP</span>
          <Link>
            <img src={playstore} alt="get it on playstore" />
          </Link>
          <div>
            <span>FOLLOW US</span>
            <div>
              <a href="https://www.facebook.com/profile.php?id=61559423217297&mibextid=ZbWKwL">
                <button>FB</button>
              </a>
              <a href="https://www.instagram.com/caterorange/?igsh=MXdndXJrd2t5MTlqZw%3D%3D">
                <button>INSTA</button>
              </a>
            </div>
          </div>
        </div>
      <div className='footer-tops'>
        <div className='footer-top-2'>
          <span>QUICK LINKS</span>
          <div className='footer-top-2-child2'>
            <span><span></span><a role='button'>FAQ</a></span>
            <span><Link to="/aboutus" onClick={handleScrollToTop}>About Us</Link></span>
            <span><Link to="/Contactus" onClick={handleScrollToTop}>Contact Us</Link></span>
            {/* <span><a role='button'>Pricing</a></span> */}
            <span><Link to="/TermsandConditions" onClick={handleScrollToTop}>Terms and Conditions</Link></span>
            <span><Link to="/PrivacyPolicy" onClick={handleScrollToTop}>Privacy Policy</Link></span>
            <span><Link to="/CancellationandRefund" onClick={handleScrollToTop}>Cancellation and Refund Policy</Link></span>
          </div>
        </div>
        <div className='footer-top-3'>
          <span>REACH US</span>
          <div className='footer-top-3-child2'>
            <span><span></span><span>info@caterorange.com</span></span>
            <span><span></span><span>9381565258</span></span>
            <span><span></span><span>8123700851</span></span>
          </div>
        </div>
        </div>
      </div>
      <hr />
      <div className='footer-bottom'>Copyright © 2024 CaterOrange. All rights reserved.</div>
    </div>
  );
}
