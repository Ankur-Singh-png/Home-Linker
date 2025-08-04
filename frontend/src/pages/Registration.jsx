import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';
import { toast } from 'react-toastify';
import { registerUser } from '../services/user';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    dob: '',
  });
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onRegister = async () =>{

    if(formData.firstName.length === 0)
      toast.warn("First Name is required");
    else if(formData.lastName.length === 0)
      toast.warn("Last Name is required");
    else if(formData.email.length === 0)
      toast.warn("Email is required");
    else if(formData.phoneNumber.length === 0)
      toast.warn("Phone Number is required"); 
    else if(formData.password.length === 0)
      toast.warn("Password is required");
    else if(formData.confirmPassword.length === 0)
      toast.warn("Confirm Password is required");
    else if(formData.password !== formData.confirmPassword)
      toast.warn("Passwords do not match");
    else if(formData.dob.length === 0)
      toast.warn("Date of Birth is required");  
    else{
      
      const { firstName, lastName, email, phoneNumber, password, dob } = formData;
      const result = await registerUser(firstName, lastName, email, phoneNumber, password, dob);
      console.log('Registration result :', result);
      if (result.status === 201) {
        toast.success('Successfully registered new user');
        navigate('/login');
      } else {
        toast.error('Registration failed. Please try again');
      }

    
    }

  };

  return (
    <div className="container">
      <h2 className="heading">Registration Form</h2>
      <div className="form" >
        <div className="form-group">
          <label>FirstName:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>LastName:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
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
          <label>PhoneNumber:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
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
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className='AccountType'>
          <label>Account Type:</label>
          <input type="text" name="type" value="User" readOnly />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

    <br />
        <div className="form-group full-width">
          Already have an account?
          <Link to="/login" style={{ color: 'rgba(125, 175, 58, 1)' }}> Click here to Login</Link>
        </div>

        
        <button type="submit" className="submit-btn full-width"
         onClick={onRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
