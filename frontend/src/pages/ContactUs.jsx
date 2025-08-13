import React, { useState } from 'react';
import './ContactUs.css';
import emailIcon from '../assets/email-icon.jpg';
import { toast } from 'react-toastify';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = sessionStorage.getItem('userId');
      const response = await axios.post(
        `http://localhost:8080/contactus/addQuery/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Query sent successfully!");
        setFormData({ first_name: '', last_name: '', description: '' });
      } else {
        toast.error("Failed to send message!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message!");
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-heading">Have Some Questions?</h1>
      <p className="contact-location">
        🌍 Office Location: Hinjewadi, Phase 1, Pune, Maharashtra
      </p>

      <div className="contact-content">
        <div className="contact-image">
          <img src={emailIcon} alt="Envelope" />
          <p>
            <a href="mailto:ankursinghsk759@gmail.com">Click here to mail us</a>
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Your question..."
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
