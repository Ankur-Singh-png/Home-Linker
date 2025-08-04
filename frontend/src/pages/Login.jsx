import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-toastify';
import { loginUser } from '../services/user';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if(formData.email.length === 0) 
      toast.warn("Email is required");
    else if(formData.password.length === 0)
      toast.warn("Password is required");
    else {
     
      const result = await loginUser(formData.email, formData.password);
      //console.log('Login result:', result);
      if (result.status === 200) {
        toast.success('Welcome to Home Linker')
       sessionStorage.setItem('token', result.data);
       //console.log(sessionStorage.getItem('token'))
        navigate('/home')
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
      
 
  };

  return (
    <div className="container">
      <h2 className="heading">Login Form</h2>
      <div className="form">
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

        <button type="submit" className="submit-btn full-width"
        onClick={handleSubmit}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
