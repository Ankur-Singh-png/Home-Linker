import  { useState } from "react";
// import { useNavigate } from "react-router-dom";
import "./AddProperty.css";

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    location: "",
    description: "",
    image: null,
    contact: "",
  });

  const [error, setError] = useState("");

//   const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.price <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    setError("");
    console.log("Property Submitted:", formData);
    alert("Property submitted successfully!");

    // navigate("/home");

    setFormData({
      title: "",
      type: "",
      price: "",
      location: "",
      description: "",
      image: null,
      contact: "",
    });
  };

  return (
    <div className="container">
      <h2 className="heading">Add Property for Sale</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>Property Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Property Type:</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <label>Upload Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />

        <label>Contact Email:</label>
        <input
          type="email"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        {error && <p className="error">{error}</p>}

        <button type="submit">Submit Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
