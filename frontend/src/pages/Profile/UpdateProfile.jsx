import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './UpdateProfile.module.css';

import { getUserById, updateUser } from '../../services/user';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const user = await getUserById(id, token);
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: '',
          confirmPassword: '',
          dob: user.dob,
        });
      } catch (err) {
        console.error(err);
        setError('Failed to load user data');
      }
    };

    fetchUser();
  }, [id]);


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async  e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    const token = sessionStorage.getItem('token');

    const updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      dob: formData.dob
    };

    try {
      await updateUser(id, updatedData, token);
      alert('Profile updated successfully');
      navigate('/userprofile');
    } catch (err) {
      console.error(err);
      setError('Update failed');
    }
  };

  const handleCancel = () => {
    navigate('/userprofile');
  };


  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.pageTitle}>
          <h2>Update Profile Page</h2>
        </div>
        <div className={styles.profileAvatar}>
          <img  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"alt='Update-Profile_Img' className={styles.updateProfileImage} />
        </div>

        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <label>First Name</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <label>Last Name</label>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <label>Email Address</label>
          <div className={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="example@youremail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label>Phone Number</label>
          <div className={styles.inputGroup}>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="1234 5678 9101"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <label>Password</label>
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <label>Confirm Password</label>
          <div className={styles.inputGroup}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <label>Date of Birth</label>
          <div className={styles.inputGroup}>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.btnUpdate}>Update Profile</button>
          <button type="button" className={styles.btnCancel} onClick={handleCancel}>Cancel</button>
        </form>

        <div className={styles.passwordSection}>
          <br />
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
