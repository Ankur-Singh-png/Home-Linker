import React, { useEffect, useState } from 'react';
import { fetchWishlist, removeFromWishlist } from '../services/Wishlist';
import './Wishlist.css';
import Item from '../components/Item';

const Wishlist = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const loadWishlist = async () => {
      setLoading(true);
      try {
        if (!token) throw new Error("Unauthorized. Please log in.");
        const data = await fetchWishlist();
        console.log("Fetched wishlist data:", data);
        setProperties(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch wishlist.");
      } finally {
        setLoading(false);
      }
    };
    loadWishlist();
  }, []);

  // Remove handler
  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id, token);
      setProperties((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Unable to remove from wishlist.");
    }
  };

  return (
    <div className="wishlist-page-container">
      <h1 className="page-title">📅 My Wishlist</h1>

      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading...</p>}

      {!loading && properties.length === 0 && !error ? (
        <p className="no-properties">Your wishlist is empty.</p>
      ) : (
        <ul className="property-list">
          {properties.map((property,index) => (
            <Item key={index} property={property}/>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;