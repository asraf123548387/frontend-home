import React, { useState } from 'react';
import UserService from '../../service/UserService';
import { useNavigate } from 'react-router-dom';
function ForgotPasswordVerifyPage() {
    const navigate=useNavigate();
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage,setErrorMessage]=useState(' ')

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        setErrorMessage('Password and confirm password do not match');
        return;
      }
      setErrorMessage('')
      try{
        const response=await UserService.resetPassword({otp,newPassword});
        console.log('Password reset request is sent', response.data);
        navigate('/login')
      }catch(error){
        console.log('Password reset request failed:', error.response?.data || 'Unexpected error');
      }
    // Add logic for resetting the password with the provided OTP, new password, and confirm password
  };

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-7 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium">Change  Password</h1>
      <p className="text-slate-500">Fill up the form to reset the password</p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-2">
          <label htmlFor="otp" className="font-medium text-slate-700">
            OTP
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <label htmlFor="newPassword" className="font-medium text-slate-700 ">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
         {errorMessage}
          <label htmlFor="confirmPassword" className="font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>
            <span>Change Password</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordVerifyPage;
