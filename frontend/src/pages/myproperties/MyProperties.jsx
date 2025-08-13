import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchPropertiesByUserId , deleteProperty  } from '../../services/Property';
import './MyProperties.css';

const MyProperties = () => {
  const { userId } = useParams(); 
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
    const token = sessionStorage.getItem('token');
    if(token === null)
      navigate("/login")
  });

  const handleUpdate = (propertyId) => {
   
    if (userId) {
      navigate(`/updateproperties/${userId}/${propertyId}`);
    } else {
      alert('User not logged in.');
    }
  };

  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(propertyId);
        // Refetch properties after delete
        const updatedList = await fetchPropertiesByUserId(userId);
        setProperties(updatedList);
      } catch (err) {
        setError("Failed to delete property.");
      }
    }
  };
  
  

 
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const data = await fetchPropertiesByUserId(userId);
        setProperties(data);
      } catch (err) {
        setError('Failed to fetch properties.');
      }
    };

    if ( userId) {
      loadProperties();
    } else {
      setError('Unauthorized. Please log in.');
    }
  }, []);//userId]);

  return (
    <div>
      <div className="page-container">
        <h1 className="page-title">My Properties</h1>

        {error && <p className="error-message">{error}</p>}

        {properties.length === 0 && !error ? (
          <p className="no-properties">No properties found.</p>
        ) : (
          <ul className="property-list">
            {properties.map((property) =>
             ( 
        
              <li key={property.id} className="property-card">
                <img src={property.imageURL} alt={property.title} className='property-image' />
                <h3>{property.title}</h3>
                <p><strong>City:</strong> {property.city}</p>
                <p><strong>State:</strong> {property.state}</p>
                <p><strong>Price:</strong> ₹{property.price.toLocaleString()}</p>
                <p><strong>Available:</strong> {property.available ? 'Yes' : 'No'}</p>
                {/* Buttons */}
                <div className="button-group">
                  <button  onClick={() => handleUpdate(property.id)}  className="btn update-btn">Update</button>
                  <button  onClick={() => handleDelete(property.id)}   className="btn delete-btn">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
