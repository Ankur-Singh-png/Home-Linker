import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewDetails = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/property/${propertyId}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        setDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch property details", error);
      }
    };

    fetchProperty();
  }, [propertyId]);

  const formatBoolean = (value) => (value ? 'Yes' : 'No');
return (
  details && (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-md shadow hover:bg-gray-700 transition duration-200"
        >
          ⬅ Back
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full group overflow-hidden">
          <img
            src={details.imageURL}
            alt={details.title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            style={{ maxHeight: '650px' }}
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 w-full p-6 md:p-10 overflow-y-auto space-y-5">
          <h2 className="text-3xl font-semibold text-gray-800">{details.title}</h2>
          <p className="text-gray-700 leading-relaxed">{details.category.title}</p>
          <p className="text-gray-700 leading-relaxed">{details.description}</p>

          {/* Address */}
          <div>
            <p className="text-gray-600 text-sm">
              <strong className="text-gray-800">Address:</strong> {details.address}, {details.city}, {details.state}, {details.country} - {details.pincode}
            </p>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p><strong>Area:</strong> {details.area} sq.ft</p>
            <p><strong>Bedrooms:</strong> {details.bedrooms}</p>
            <p><strong>Price:</strong> ₹{details.price}</p>
            <p><strong>Kitchens:</strong> {details.kitchens}</p>
            <p><strong>Available:</strong> {formatBoolean(details.available)}</p>
            <p><strong>Bathrooms:</strong> {details.bathrooms}</p>
            <p><strong>Created On:</strong> {details.creationDate}</p>
            <p><strong>Halls:</strong> {details.halls}</p>
          </div>

          {/* Amenities */}
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">Amenities</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              {details.tv && <li>📺 TV</li>}
              {details.ac && <li>❄️ Air Conditioner</li>}
              {details.wifi && <li>📶 WiFi</li>}
              {details.parking && <li>🅿️ Parking</li>}
              {details.furnised && <li>🛋️ Furnished</li>}
            </ul>
          </div>

          {/* Buttons */}
          <div className="pt-6 flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition">
              📅 Book Now
            </button>
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg shadow-md transition">
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  )
);


};

export default ViewDetails;
