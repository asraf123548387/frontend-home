import React, { useEffect } from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';


const AddRoomModal = ({ isOpen, onSuccess }) => {
  const [room, setRoom] = useState({
    roomNumber: '',
    roomType: '',
    hotelId: '',
    pricePerNight: '',
    images: '',
  });

  const [hotels, setHotels] = useState([]);
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleHotelChange = (e) => {
    const { name, value } = e.target;
    setRoom({ ...room, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation here

 
    try {
      // Make a POST request to your backend API
      const token = localStorage.getItem('token');
      console.log(room);
      const response = await axios.post('https://www.emoh.tech/api/admin/adminAddRoom', room, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.status === 200) {
        // Handle successful form submission
        setMsg("Room added successfully");
        
        if (onSuccess) {
          onSuccess();
        }
        // Clear the form fields
        setRoom({
          roomNumber:'',
          roomType:'',
          hotelId:'',
          pricePerNight:'',
          images:'',
        });
      } else {
        // Handle other status codes or errors
        setMsg('Failed to add room. Please try again.');
      }
    } catch (error) {
      console.error('Error adding room:', error.message);
      // Handle error response from the backend
      setMsg('Failed to add room. Please try again.');
    }
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        console.log(userId);
        const headers = {
          'Authorization': `Bearer ${token}`,
        };
        const response = await axios.get(`https://www.emoh.tech/api/admin/adminHotelListInAddRoom/${userId}`, { headers });
        setHotels(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'transparent',  // Set overlay background to transparent
          },
          content: {
            border: 'none',  // Remove border
            background: 'transparent',  // Set content background to transparent
            overflowY: 'scroll',
            height: 'auto',
          },
        }}
      >
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <div className='bg-white p-3 rounded w-50 shadow'>
            <h2 className="text-center mb-3">Add Rooms</h2>
            {msg && <p className="text-center text-success font-weight-bold">{msg}</p>}
      
            <form className="w-full max-w-lg" onSubmit={(e) => handleSubmit(e)}>
              {/* Form fields */}
              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="roomNumber">
                    Room Number:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="roomNumber" type="text" placeholder="..." onChange={handleChange} value={room.roomNumber}/>
                  {errors.roomNumber && <p className="text-danger">{errors.roomNumber}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="roomType">
                    Room Type:
                  </label>
                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="roomType"
                    onChange={handleChange}
                    value={room.roomType}
                  >
                    <option value="">Select Room Type</option>
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="deluxe">Deluxe</option>
                  </select>
                  {errors.roomType && <p className="text-danger">{errors.roomType}</p>}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pricePerNight">
                    Price Per Night:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="pricePerNight" type="text" placeholder="..." onChange={handleChange} value={room.pricePerNight}/>
                  {errors.pricePerNight && <p className="text-danger">{errors.pricePerNight}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="images">
                    images:
                  </label>
                  <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="images" type="text" placeholder="..." onChange={handleChange} value={room.images}/>
                  {errors.images && <p className="text-danger">{errors.images}</p>}
                </div>
              </div>

              <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full px-3">
                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hotelId">
                    Hotel Name:
                  </label>
                  <select
                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    name="hotelId"
                    onChange={handleHotelChange}
                    value={room.hotelId}
                  >
                    <option value="">Select Hotel</option>
                    {hotels.map((hotel) => (
                      <option key={hotel.hotelId} value={hotel.hotelId}>{hotel.hotelName}</option>
                    ))}
                  </select>
                  {errors.hotelId && <p className="text-danger">{errors.hotelId}</p>}
                </div>
              </div>

              <div className="d-flex justify-content-between">
                <button type="submit" className='btn btn-primary btn-block'>Add</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddRoomModal;
