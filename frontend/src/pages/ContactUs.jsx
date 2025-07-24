import React from 'react';
// import { FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import './ContactUs.css';
import emailIcon from '../assets/email-icon.jpg';


const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-heading">Have Some Questions?</h1>
      <p className="contact-location">
        🌍 Office Location: Hinjewadi, Phase 1, Pune, Maharashtra
      </p>

      <div className="contact-content">
        {/* Left: Image and Email */}
        <div className="contact-image">
          <img
            src={emailIcon}
            alt="Envelope"
          />
          <p>
            <a href="mailto:ankursinghsk759@gmail.com">Click here to mail us</a>
          </p>
        </div>

        {/* Right: Form */}
        <form className="contact-form">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
          <input type="email" placeholder="Email" required />
          <textarea placeholder="Your question..." rows="4" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Social Media Links */}
      {/* <div className="socialHandles">
        <h3>Follow us</h3>
        <div className="social-icons">
          <a href="https://www.instagram.com/property.listings_pune?igsh=a3c3cGRkcnIwOXl1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://x.com/elonmusk" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://github.com/Ankur-Singh-png/HomeLinker" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default ContactUs;
