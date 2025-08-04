import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // navigation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login form submitted:', formData);
    // After login, redirect to home page
    navigate('/home');
  };

  return (
    <div className="container">
      <h2 className="heading">Login Form</h2>
      <form className="form" onSubmit={handleSubmit}>
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

        <div className="form-group full-width">
          Don't have an account?
          <Link to="/register" style={{ color: 'rgba(125, 175, 58, 1)' }}> Click to Register </Link>
        </div>

        <button type="submit" className="submit-btn full-width">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
