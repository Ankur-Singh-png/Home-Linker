import { useLocation, useNavigate } from 'react-router-dom'
// import './PropertyDetails.css'
import React, { useEffect, useState,useParams } from 'react';
import axios from 'axios';

const ViewDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/properties/${propertyId}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch property details", error);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const formatBoolean = (value) => value ? 'Yes' : 'No';

  return (
    details && (
      <div className='container mt-5'>
        {/* Title & Image */}
        <div className='row'>
          <div className='col'>
            <h2 className='mt-3 mb-3'>{details.title}</h2>
            <img
              src={details.imageURL}
              alt={details.title}
              style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
              className='rounded'
            />
          </div>
        </div>

        {/* Address and Description */}
        <div className='row mt-4'>
          <div className='col'>
            <h5><strong>Address:</strong> {details.address}, {details.city}, {details.state}, {details.country} - {details.pincode}</h5>
            <p className='mt-3'>{details.description}</p>
          </div>
        </div>

        {/* Property Details */}
        <div className='row mt-4'>
          <div className='col-md-6'>
            <ul className='list-group'>
              <li className='list-group-item'><strong>Area:</strong> {details.area} sq.ft</li>
              <li className='list-group-item'><strong>Price:</strong> ₹{details.price}</li>
              <li className='list-group-item'><strong>Available:</strong> {formatBoolean(details.available)}</li>
              <li className='list-group-item'><strong>Created On:</strong> {details.creationDate}</li>
            </ul>
          </div>
          <div className='col-md-6'>
            <ul className='list-group'>
              <li className='list-group-item'><strong>Bedrooms:</strong> {details.bedrooms}</li>
              <li className='list-group-item'><strong>Kitchens:</strong> {details.kitchens}</li>
              <li className='list-group-item'><strong>Bathrooms:</strong> {details.bathrooms}</li>
              <li className='list-group-item'><strong>Halls:</strong> {details.halls}</li>
            </ul>
          </div>
        </div>

        {/* Amenities */}
        <div className='row mt-5'>
          <div className='col'>
            <h4 className='mb-3'>Amenities</h4>
            <ul className='list-unstyled'>
              {details.tv && <li>📺 TV</li>}
              {details.ac && <li>❄️ Air Conditioner</li>}
              {details.wifi && <li>📶 WiFi</li>}
              {details.parking && <li>🅿️ Parking</li>}
              {details.furnised && <li>🛋️ Furnished</li>}
            </ul>
          </div>
        </div>

        {/* Back Button */}
        <div className='row mt-4'>
          <div className='col'>
            <button onClick={() => navigate(-1)} className='btn btn-secondary'>
              ⬅ Back
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ViewDetails;
