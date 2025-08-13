import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getUserById} from '../../services/user'
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  const id = sessionStorage.getItem('userId');

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if(token === null)
      navigate("/login")
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id || !token) {
        console.error('Missing token or user ID');
        return;
      }

      try {
        const userData = await getUserById(id, token);
        setUser(userData);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleEditProfile = () => {
    navigate(`/updateprofile/${id}`);
  };

  if (!user) {
    return <div className="profile-container">Failed to load the User Data...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="profile-img"
          />
          <h2>{user.firstName} {user.lastName}</h2>
          <span className="edit-icon" onClick={handleEditProfile} title="Edit Profile">✎</span>
        </div>

        <div className="profile-right">
          <div className="info-section">
            <h3>Information</h3>
            <div className="info-row">
              <div>
                <p className="label">Email</p>
                <p className="value">{user.email}</p>
              </div>
              <div>
                <p className="label">Phone</p>
                <p className="value">{user.phoneNumber}</p>
              </div>
              <div>
                <p className="label">Date of Birth</p>
                <p className="value">{user.dob}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;