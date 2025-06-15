import React from "react";
import "./Footer.css";
import { FaFacebookF, FaXTwitter, FaYoutube, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { IoGlobeOutline } from "react-icons/io5";
import { GoLocation } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Uber</h2>
          <a href="#">Visit Help Center</a>
        </div>
        <div className="footer-links">
          <div>
            <h4>Company</h4>
            <ul>
              <li>About us</li>
              <li>Our offerings</li>
              <li>Newsroom</li>
              <li>Investors</li>
              <li>Blog</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h4>Products</h4>
            <ul>
              <li>Ride</li>
              <li>Drive</li>
              <li>Deliver</li>
              <li>Eat</li>
              <li>Uber for Business</li>
              <li>Uber Freight</li>
              <li>Gift cards</li>
              <li>Uber Health</li>
            </ul>
          </div>
          <div>
            <h4>Global citizenship</h4>
            <ul>
              <li>Safety</li>
              <li>Sustainability</li>
            </ul>
          </div>
          <div>
            <h4>Travel</h4>
            <ul>
              <li>Reserve</li>
              <li>Airports</li>
              <li>Cities</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-mid">
        <div className="social-icons">
          <FaFacebookF />
          <FaXTwitter />
          <FaYoutube />
          <FaLinkedinIn />
          <FaInstagram />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="language-location">
          <span><IoGlobeOutline /> English</span>
          <span><GoLocation /> Dhaka</span>
        </div>
        <div className="bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Accessibility</a>
          <a href="#">Terms</a>
        </div>
      </div>

      <div className="footer-copy">
        <p>© 2025 Uber Technologies Inc.</p>
      </div>
    </footer>
  );
};

export default Footer;
