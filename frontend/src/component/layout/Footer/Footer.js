import React from 'react';
import playStore from "../../../images/playstore.png";
import Appstore from "../../../images/Appstore.png";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";

import "./footer.css";

const Footer = () => {
    return (
       <footer id="id">
           <div className="leftfooter">

            <p>Download App for Android and iOS</p>
            <div>
            <img src={ playStore } alt="play store" /> 
            <img src={ Appstore } alt="app store" />  
            </div>
           </div>
           <div className="middlefooter">
               <h1>Vogue-Emporium</h1>
               <p>High Quality is our First priority</p>
                
                <p> Copy Rights 2021 &copy; MrShawakChoudhary</p>
           </div>
           <div className="rightfooter">
                <h4>Follow Me</h4>
              <div>
              <a href="https://www.instagram.com/iamshawakchoudhary/"><FaInstagram /></a>
                <a href="https://www.facebook.com/shawak.chaudhary.5/"><FaFacebook  /></a>
                <a href="https://github.com/shawakchoudhary"><FaGithub /></a>
              </div>
           </div>
       </footer>
    )
}

export default Footer;
