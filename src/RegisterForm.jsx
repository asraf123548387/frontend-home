import React, { useState } from 'react';
import UserService from '../src/service/UserService';
import { Link, useNavigate } from 'react-router-dom';

function RegisterForm() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear validation errors when the user types
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

  const RegisterUser = (e) => {
    e.preventDefault();

    if (validateForm()) {
      UserService.saveUser(user)
        .then((res) => {
          console.log("User Added Successfully");
          console.log(user);
          setMsg("User Added Successfully");
          navigate('/otp', { state: { email: user.email } });
          setUser({
            userName: "",
            email: "",
            mobile: "",
            password: "",
          });
        })
        .catch((error) => {
          if (error.response && error.response.status === 400 && error.response.data) {
            setMsg(error.response.data);
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-3 rounded w-96 shadow-md">
        <h2 className="text-center mb-3 text-2xl">Create Account</h2>
        {msg && <p className="text-center text-green-600 font-semibold">{msg}</p>}
        <form onSubmit={RegisterUser} className="space-y-4">
          <div className="mb-3 relative">
            <label htmlFor="userName" className="block">User Name:</label>
            <input type="text" name="userName" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" onChange={handleChange} value={user.userName} />
            {errors.userName && (
              <div className="absolute top-full left-0 mt-1 text-red-500">
                {errors.userName}
              </div>
            )}
          </div>

          <div className="mb-3 relative">
            <label htmlFor="email" className="block">Email:</label>
            <input type="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" onChange={handleChange} value={user.email} />
            {errors.email && (
              <div className="absolute top-full left-0 mt-1 text-red-500">
                {errors.email}
              </div>
            )}
          </div>

          <div className="mb-3 relative">
            <label htmlFor="mobile" className="block">Mobile No:</label>
            <input type="text" name="mobile" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" onChange={handleChange} value={user.mobile} />
            {errors.mobile && (
              <div className="absolute top-full left-0 mt-1 text-red-500">
                {errors.mobile}
              </div>
            )}
          </div>

          <div className="mb-3 relative">
            <label htmlFor="password" className="block">Password:</label>
            <input type="password" name="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" onChange={handleChange} value={user.password} />
            {errors.password && (
              <div className="absolute top-full left-0 mt-1 text-red-500">
                {errors.password}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Submit</button>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
