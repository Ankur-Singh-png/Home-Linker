import React, { useEffect, useState } from 'react';
import { fetchWishlist, removeFromWishlist } from '../services/Wishlist';
import './Wishlist.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const data = await fetchWishlist();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch wishlist.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
      if(token === null)
        navigate("/login")
    loadWishlist();
  }, []);

  const handleDelete = async (propertyId) => {
    if (window.confirm('Are you sure you want to remove this from your wishlist?')) {
      try {
        await removeFromWishlist(propertyId);
        toast.success('Removed from wishlist');
        loadWishlist();
      } catch (err) {
        toast.error('Failed to remove from wishlist');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">
      <h2 className="page-title">My Wishlist</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map((property) => (
            <div key={property.propertyId} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-xl">
              <img
                src={property.imageURL}
                alt={property.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">{property.title}</h3>
                <p className="text-gray-700">{property.categoryTitle}</p>
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {property.address}, {property.city}, {property.state}, {property.country} - {property.pincode}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <p><strong>Area:</strong> {property.area} sq.ft</p>
                  <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                  <p><strong>Price:</strong> ₹{property.price}</p>
                  <p><strong>Kitchens:</strong> {property.kitchens}</p>
                  <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                  <p><strong>Halls:</strong> {property.halls}</p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Amenities</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    {property.tv && <li>📺 TV</li>}
                    {property.ac && <li>❄️ Air Conditioner</li>}
                    {property.wifi && <li>📶 WiFi</li>}
                    {property.parking && <li>🅿️ Parking</li>}
                    {property.furnised && <li>🛋️ Furnished</li>}
                  </ul>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(property.propertyId)}
                >
                  Delete from Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;