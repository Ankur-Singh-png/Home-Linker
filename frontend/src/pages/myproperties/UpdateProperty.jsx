import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../AddProperty.css";

import { fetchPropertyById, updateProperty } from "../../services/Property";

const UpdateProperty = () => {
  const { userId, propertyId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    area: 0.0,
    price: 0.0,
    available: true,
    bedrooms: 0,
    kitchens: 0,
    bathrooms: 0,
    halls: 0,
    tv: false,
    ac: false,
    wifi: false,
    parking: false,
    furnished: false,
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        const data = await fetchPropertyById(userId, propertyId);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          country: data.country || "",
          pincode: data.pincode || "",
          area: data.area ?? 0.0,
          price: data.price ?? 0.0,
          available: data.available ?? true,
          bedrooms: data.bedrooms ?? 0,
          kitchens: data.kitchens ?? 0,
          bathrooms: data.bathrooms ?? 0,
          halls: data.halls ?? 0,
          tv: data.tv ?? false,
          ac: data.ac ?? false,
          wifi: data.wifi ?? false,
          parking: data.parking ?? false,
          furnished: data.furnished ?? false,
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load property data");
      }
    };

    loadProperty();
  }, [userId, propertyId]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) || 0 : value;
    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.warn("Title is required");
      return;
    }
    if (!formData.description.trim()) {
      toast.warn("Description is required");
      return;
    }

    try {
      const response = await updateProperty(userId, propertyId, formData);

      if (response.status === 200 || response.status === 204) {
        toast.success("Property updated successfully");
        navigate(`/myproperties/${userId}`);
      } else {
        toast.error("Failed to update property");
      }
    } catch (error) {
      toast.error("Error updating property");
      console.error(error);
    }
  };

  return (
    <div className="property-container">
      <h2 className="heading">Update Property</h2>

      {error && <p className="error-message">{error}</p>}

      <form className="form" onSubmit={handleSubmit}>
        {/* Text inputs */}
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Area (sq ft):</label>
          <input
            type="number"
            name="area"
            value={formData.area}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price (INR):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Kitchens:</label>
          <input
            type="number"
            name="kitchens"
            value={formData.kitchens}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Bathrooms:</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Halls:</label>
          <input
            type="number"
            name="halls"
            value={formData.halls}
            onChange={handleInputChange}
          />
        </div>

        {/* Checkboxes */}
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleCheckboxChange}
            />
            Available
          </label>
          <label>
            <input
              type="checkbox"
              name="tv"
              checked={formData.tv}
              onChange={handleCheckboxChange}
            />
            TV
          </label>
          <label>
            <input
              type="checkbox"
              name="ac"
              checked={formData.ac}
              onChange={handleCheckboxChange}
            />
            AC
          </label>
          <label>
            <input
              type="checkbox"
              name="wifi"
              checked={formData.wifi}
              onChange={handleCheckboxChange}
            />
            WiFi
          </label>
          <label>
            <input
              type="checkbox"
              name="parking"
              checked={formData.parking}
              onChange={handleCheckboxChange}
            />
            Parking
          </label>
          <label>
            <input
              type="checkbox"
              name="furnished"
              checked={formData.furnished}
              onChange={handleCheckboxChange}
            />
            Furnished
          </label>
        </div>

        <button type="submit" className="submitbtn">
          Update Property
        </button>
      </form>
    </div>
  );
};

export default UpdateProperty;
