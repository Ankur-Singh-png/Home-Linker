import { useEffect, useState } from "react";
import "./AddProperty.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import { registerProperty } from "../services/Property";
import { getAllCategories } from './../services/Property';

const AddProperty = () => {
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
    ownerId: sessionStorage.getItem("userId"),
    categoryId:"",
  });

  //const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const token = sessionStorage.getItem('token');
  if(token === null)
    navigate("/login")
  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      console.log("Categories fetched:", res);
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  fetchCategories();
}, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

 
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    console.log(name + "" + checked)
    setFormData((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

 
const handleDropDownChange = (e) => {
  const selectedId = e.target.value;
  setFormData((prev) => ({
    ...prev,
    categoryId: selectedId
  }));
  console.log("Selected category ID:", selectedId);
};

const handleFileChange = (e) => {
  const file = e.target.files[0]; 
    setImage(file);

};   

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.title.trim()) {
    toast.warn("Title is required");
  } else if (!formData.description.trim()) {
    toast.warn("Description is required");
  } else if (!formData.address.trim()) {
    toast.warn("Address is required");
  } else if (!formData.city.trim()) {
    toast.warn("City is required");
  } else if (!formData.state.trim()) {
    toast.warn("State is required");
  } else if (!formData.country.trim()) {
    toast.warn("Country is required");
  } else if (!formData.pincode.trim()) {
    toast.warn("Pincode is required");
  } else if (!formData.area || formData.area <= 0) {
    toast.warn("Area must be greater than 0");
  } else if (!formData.categoryId) {
    toast.warn("Please select a category");
  } else if (!formData.price || formData.price <= 0) {
    toast.warn("Price must be greater than 0");
  } else if (!image) {
    toast.warn("Please upload an image");
  } else {
    const formDataToSubmit  = new FormData();
    formDataToSubmit.append("imageFile", image);
    formDataToSubmit.append("property",  new Blob([JSON.stringify(formData)], { type: "application/json" }));

    const result = await registerProperty(formDataToSubmit);
    console.log(result);
    if(result.status === 201) {
      toast.success("Property added successfully");
      navigate("/home");   
  }
  else {
      toast.error("Failed to add property");
    }   
}

};
  


  return (
    <div className="property-container">
      <h2 className="heading">Add Property for Sale</h2>
      <div className="form-container">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" required />
        </div>

        <div className="form-group">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Country:</label>
          <input type="text" name="country" value={formData.country} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Pincode:</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Area (sq ft):</label>
          <input type="number" name="area" value={formData.area} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select value={formData.categoryId} onChange={handleDropDownChange}>
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
      </select>
        </div>

        <div className="form-group">
          <label>Upload Image:</label>
          <input type="file" name="image"  accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
        </div>


        <div className="form-group">
          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label>Bedrooms:</label>
          <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Kitchens:</label>
          <input type="number" name="kitchens" value={formData.kitchens} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Bathrooms:</label>
          <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label>Halls:</label>
          <input type="number" name="halls" value={formData.halls} onChange={handleInputChange} />
        </div>

        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="available" checked={formData.available} onChange={handleCheckboxChange} />
            Available
          </label>
          <label>
            <input type="checkbox" name="tv" checked={formData.tv} onChange={handleCheckboxChange} />
            TV
          </label>
          <label>
            <input type="checkbox" name="ac" checked={formData.ac} onChange={handleCheckboxChange} />
            AC
          </label>
          <label>
            <input type="checkbox" name="wifi" checked={formData.wifi} onChange={handleCheckboxChange} />
            WiFi
          </label>
          <label>
            <input type="checkbox" name="parking" checked={formData.parking} onChange={handleCheckboxChange} />
            Parking
          </label>
          <label>
            <input type="checkbox" name="furnished" checked={formData.furnished} onChange={handleCheckboxChange} />
            Furnished
          </label>
        </div>
        <button type="submit" className="submitbtn" onClick={handleSubmit}>Submit Property</button>
      </div>
    </div>
  );
};

export default AddProperty;