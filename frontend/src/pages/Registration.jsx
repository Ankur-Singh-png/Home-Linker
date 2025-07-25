import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data submitted:', formData);
    // You can add validation or API call here
  };

  return (
    <div className="container">
      <h2 className="heading">Registration Form</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className='AccountType'>
        <label>Account Type:</label>
        <select name="type" value={formData.type} required>
          <option value="">Select Type</option>
          <option value="Apartment">Admin</option>
          <option value="House">Broker</option>
          <option value="Plot">Normal User</option>
        </select>
        </div>

    <br />
        <div className="form-group full-width">
          Already have an account?
          <Link to="/login" style={{ color: 'blue' }}> Click here to Login</Link>
        </div>

        
        <button type="submit" className="submit-btn full-width">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
