import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Otppage() {
  const navigate=useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const inputRefs = useRef(Array(4).fill(null).map(() => React.createRef()));

  const handleChange = (index, value) => {
    setVerificationCode((prevVerificationCode) => {
      const newVerificationCode = [...prevVerificationCode];
      newVerificationCode[index] = value;
  
      // Move focus to the next input field if a character is entered
      if (value !== '' && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].current.focus();
      }
  
      return newVerificationCode;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/verifyOtp', {
        email,
        otp: verificationCode.join(''),

      });

      // Handle the response as needed
      console.log('Verification Successful:', response.data);
      navigate('/login')

    } catch (error) {
      // Handle errors, for example, display an error message
      console.error('Verification Failed:', error.response?.data || 'Unexpected error');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email}</p>
            </div>
          </div>

          <div>
            <form  className="max-w-xs mx-auto" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-row items-center justify-between">
                  {verificationCode.map((value, index) => (
                    <div key={index} className="flex justify-center gap-2 mb-6">
                      <input
                        ref={inputRefs.current[index]}
                        className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500" type="text" maxlength="1" pattern="[0-9]" inputmode="numeric" autocomplete="one-time-code" 
                        
                        name={`digit-${index}`}
                        id={`digit-${index}`}
                        value={value}
                        onChange={(e) => handleChange(index, e.target.value)}
                      />
                    </div>
                  ))}

         
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    className="flex items-center justify-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-sm shadow-sm"
                    type="submit"
                  >
                    Verify Account
                  </button>

                  <div className="flex items-center justify-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>{' '}
                    <Link
                      className="flex items-center text-blue-600"
                    >
                      Resend
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otppage;

