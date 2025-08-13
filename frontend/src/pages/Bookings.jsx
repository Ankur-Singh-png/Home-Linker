import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { getUserBookings, deleteBooking, updateBooking } from '../services/Property';
import './Bookings.css';
import { useNavigate } from 'react-router-dom';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const navigate = useNavigate();


  const fetchBookings = async () => {
    try {
      const data = await getUserBookings();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load your bookings.");
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
  if(token === null)
    navigate("/login")
    fetchBookings();
  }, []);

  const handleDelete = async (propertyId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await deleteBooking(propertyId);
        toast.success("Booking deleted successfully");
        fetchBookings();
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete booking");
      }
    }
  };

  const handleUpdate = async (propertyId) => {
    if (!selectedDate) {
      toast.warning("Please select a date.");
      return;
    }

    try {
      await updateBooking(propertyId, selectedDate);
      toast.success("Booking date updated.");
      setUpdatingId(null);
      setSelectedDate('');
      fetchBookings();
    } catch (error) {
      toast.error("Failed to update booking date.");
    }
  };

  const formatBoolean = (value) => (value ? 'Yes' : 'No');

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-12">
      

      <h2 className="page-title">📅 My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You haven't booked any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bookings.map((property) => (
            <div key={property.propertyId} className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                  <p><strong>Available:</strong> {formatBoolean(property.available)}</p>
                  <p><strong>Booked On:</strong> {property.bookedAt}</p>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-1">Amenities</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                    {property.tv && <li key="tv">📺 TV</li>}
                    {property.ac && <li key="ac">❄️ Air Conditioner</li>}
                    {property.wifi && <li key="wifi">📶 WiFi</li>}
                    {property.parking && <li key="parking">🅿️ Parking</li>}
                    {property.furnised && <li key="furnised">🛋️ Furnished</li>}
                  </ul>
                </div>

                <div className="flex flex-col space-y-2">
                  {updatingId === property.propertyId ? (
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border px-3 py-2 rounded"
                      />
                      <div className="flex gap-2">
                        <button
                          className="update-btn"
                          onClick={() => handleUpdate(property.propertyId)}
                        >
                          Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => {
                            setUpdatingId(null);
                            setSelectedDate('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUpdatingId(property.propertyId)}
                        className="update-btn"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(property.propertyId)}
                        className="delete-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;
