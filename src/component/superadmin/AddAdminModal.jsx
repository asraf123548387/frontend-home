import React, { useState } from 'react';
  // Import Link from react-router-dom
import Modal from 'react-modal';
import axios from 'axios';


const AddAdminModal = ({ isOpen, onRequestClose,onSuccess  }) => {
    
  const [user, setUser] = useState({
    userName: '',
    email: '',
    mobile: '',
    password: ''
  });

  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  

  const validateForm = () => {
    const newErrors = {};


    if (!user.userName.trim()) {
      newErrors.userName = "User Name is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!user.mobile.trim()) {
      newErrors.mobile = "Mobile No is required";
    } else if (!/^[0-9]+$/.test(user.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const RegisterUser = async (e) => {
    e.preventDefault();
    console.log(user)
    if (validateForm()) {
      try {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          };
        // Make a POST request to your backend API to register the admin
        const response = await axios.post('http://localhost:8080/api/SAdmin/addAdmin', user, { headers })
          
      

        // Check if the request was successful
        if (response.status === 200) {
          console.log("Admin Added Successfully");
          console.log(user);

          setMsg("Admin Added Successfully");
          // Redirect to OTP page with email state
          if (onSuccess) {
            onSuccess();
          }
          setUser({
            userName: "",
            email: "",
            mobile: "",
            password: "",
          });
        } else {
          // Handle other status codes or error scenarios
          setMsg('Failed to register admin. Please try again.');
        }
      } catch (error) {
        // Handle any errors that occurred during the request
        console.error('Error registering admin:', error.message);
        if (error.response && error.response.status === 400 && error.response.data) {
          setMsg(error.response.data);
        } else {
          console.log(error);
        }
      }
    }
  };

  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  ariaHideApp={false}
  style={{
    overlay: {
      backgroundColor: 'transparent',  // Set overlay background to transparent
    },
    content: {
      border: 'none',  // Remove border
      background: 'transparent',  // Set content background to transparent
      padding: 0,
      overflowY: 'auto'
        // Remove padding
      
    },
  }}
>
      <div>
        
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <div className='bg-white p-3 rounded w-50 shadow'>
            <h2 className="text-center mb-3">Add Admin</h2>
            {msg && <p className="text-center text-success font-weight-bold">{msg}</p>}
            <form onSubmit={(e) => RegisterUser(e)}>
              <div className='mb-3'>
                <label htmlFor='userName' className='form-label'>Admin Name:</label>
                <input type="text" name="userName" className='form-control' onChange={(e) => handleChange(e)} value={user.userName} />
                {errors.userName && <p className="text-danger">{errors.userName}</p>}
              </div>

              <div className='mb-3'>
                <label htmlFor='email' className='form-label'>Email:</label>
                <input type="email" name="email" className='form-control' onChange={(e) => handleChange(e)} value={user.email} />
                {errors.email && <p className="text-danger">{errors.email}</p>}
              </div>
              <div className='mb-3'>
                <label htmlFor='mobile' className='form-label'>Mobile No:</label>
                <input type="text" name="mobile" className='form-control' onChange={(e) => handleChange(e)} value={user.mobile} />
                {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
              </div>
              <div className='mb-3'>
                <label htmlFor='password' className='form-label'>Password:</label>
                <input type="password" name="password" className='form-control' onChange={(e) => handleChange(e)} value={user.password} />
                {errors.password && <p className="text-danger">{errors.password}</p>}
              </div>
              <div className="d-flex justify-content-between">
                <button type="submit" className='btn btn-primary btn-block'>Add</button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddAdminModal;
