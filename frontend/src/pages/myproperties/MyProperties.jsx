import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertiesByUserId } from '../../services/Property';
import './MyProperties.css';

const MyProperties = () => {
  const { userId } = useParams(); 
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem('token'); 
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchPropertiesByUserId(userId, token);
        setProperties(data);
      } catch (err) {
        setError('Failed to fetch properties.');
      }
    };

    if (token && userId) {
      loadProperties();
    } else {
      setError('Unauthorized. Please log in.');
    }
  }, [userId, token]);

  return (
    <div>
      <div className="page-container">
        <h1 className="page-title">My Properties</h1>

        {error && <p className="error-message">{error}</p>}

        {properties.length === 0 && !error ? (
          <p className="no-properties">No properties found.</p>
        ) : (
          <ul className="property-list">
            {properties.map((property) => (
              <li key={property.id} className="property-card">
                <h3>{property.title}</h3>
                <p><strong>City:</strong> {property.city}</p>
                <p><strong>State:</strong> {property.state}</p>
                <p><strong>Price:</strong> ₹{property.price.toLocaleString()}</p>
                <p><strong>Available:</strong> {property.available ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
