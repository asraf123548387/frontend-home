import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from './contextapi/authContext';
import UserService from './service/UserService';
import Swal from 'sweetalert2'



function Login() {
  const [error1, setError1] = useState(null); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate=useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.userLogin(formData)

      if (response.status >= 200 && response.status < 300) {
        const {token,userId,userName} = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('userId',userId);
        localStorage.setItem('userName',userName)
        
        const decodedToken = atob(token.split('.')[1]);
        const tokenObject = JSON.parse(decodedToken);
        const roles = tokenObject.roles || [];

        
        login();
       console.log(roles);
       console.log(token);
       console.log(userId);
       console.log(userName);
       
       if (roles.includes('ROLE_ADMIN')) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "successfully logined",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/admin');
    
      } else if (roles.includes('ROLE_SADMIN')) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "successfully logined",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/SAdmin');
      
      } else {
     
        navigate('/');
        
      }
      } else {
       
        setError1('Invalid username or password');
      }
    } catch (error) {
      // Handle other types of errors (e.g., network issues)
      setError1('Login failed. Please try again.');
    }
  };
   
    return (
      <div className="d-flex justify-content-center align-items-center vh-100" >
      <div className="bg-white p-5 rounded  shadow">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
         <div style={{ color: 'red' }}>{error1}</div> 
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              
              Username:
            </label>
            <input
              type="email"
              name="email"  
              className="form-control"
              placeholder="Enter useremail"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            <Link to='/otpEmail'>Forgot Password</Link>
          </div>
          
          <button type="submit" className="btn btn-primary btn-block">
            Log In
          </button>
          <p className="mt-3 text-center text-muted">By logging in, you agree to our terms and policy</p>
          <Link to="/SignUp" className="btn btn-outline-secondary btn-block">
            Create Account
          </Link>
        </form>
      </div>
    </div>
    );
  }
  
  

export default Login
