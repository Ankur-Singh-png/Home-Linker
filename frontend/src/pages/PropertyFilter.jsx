import React, { useState } from "react";
import axios from "axios";
import "./PropertyFilter.css";

const PropertyFilter = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    bedrooms: "",
    isAvailable: "",
  });

  const API_BASE = "http://localhost:8080/property"; 

  const fetchData = async (endpoint) => {
    try {
      const token = sessionStorage.getItem('token');
      const res = await axios.get(`${API_BASE}${endpoint}` , 
              {headers: { Authorization: `Bearer ${token}`
          }});
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  // Predefined dropdown values
  const stateOptions = ["Maharashtra", "Karnataka", "Delhi", "Gujarat", "Punjab"];
  const cityOptions = ["Mumbai", "Pune", "Bangalore", "Delhi", "Ahmedabad"];
  const bedroomOptions = [1, 2, 3, 4, 5];

  return (
    <div className="property-container">
      <h2>Property Listings</h2>

      {/* Sorting Buttons */}
<div className="filters sorting">
  <button onClick={() => fetchData("/LowToHigh")}>Price Low to High</button>
  <button onClick={() => fetchData("/HighToLow")}>Price High to Low</button>
  <button onClick={() => fetchData("/SortByDate")}>Sort by Date</button>
</div>

{/* Grid Filter Dropdowns */}
<div className="filters grid">
  <select value={filters.state} onChange={(e) => setFilters({ ...filters, state: e.target.value })}>
    <option value="">Select State</option>
    {stateOptions.map((state) => (
      <option key={state} value={state}>{state}</option>
    ))}
  </select>
  <button disabled={!filters.state} onClick={() => fetchData(`/state/${filters.state}`)}>
    Filter by State
  </button>

  <select value={filters.city} onChange={(e) => setFilters({ ...filters, city: e.target.value })}>
    <option value="">Select City</option>
    {cityOptions.map((city) => (
      <option key={city} value={city}>{city}</option>
    ))}
  </select>
  <button disabled={!filters.city} onClick={() => fetchData(`/city/${filters.city}`)}>
    Filter by City
  </button>

  <select value={filters.bedrooms} onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}>
    <option value="">Select Bedrooms</option>
    {bedroomOptions.map((bed) => (
      <option key={bed} value={bed}>{bed} BHK</option>
    ))}
  </select>
  <button disabled={!filters.bedrooms} onClick={() => fetchData(`/bedrooms/${filters.bedrooms}`)}>
    Filter by Bedrooms
  </button>

  <select value={filters.isAvailable} onChange={(e) => setFilters({ ...filters, isAvailable: e.target.value })}>
    <option value="">Select Availability</option>
    <option value="true">Available</option>
    <option value="false">Not Available</option>
  </select>
  <button disabled={filters.isAvailable === ""} onClick={() => fetchData(`/isAvailable/${filters.isAvailable}`)}>
    Filter by Availability
  </button>
</div>


      {/* Display Properties */}
      <div className="property-list">
        {properties.length > 0 ? (
          properties.map((prop, index) => (
            <div key={index} className="property-card">
              <p><strong>Title:</strong> {prop.title}</p>
              <p><strong>Price:</strong> ₹{prop.price}</p>
              <p><strong>State:</strong> {prop.state}</p>
              <p><strong>City:</strong> {prop.city}</p>
              <p><strong>Bedrooms:</strong> {prop.bedrooms}</p>
              <p><strong>Available:</strong> {prop.isAvailable ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyFilter;
