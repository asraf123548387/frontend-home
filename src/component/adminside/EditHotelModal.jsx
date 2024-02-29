import React, { useEffect } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';

function EditHotelModal({isOpen,hotelData,onSuccess,onClose}) {
    const [editedHotel, setEditedHotel] = useState({ ...hotelData });
    const [msg, setMsg] = useState('');
    const [errors, setErrors] = useState({});

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedHotel({ ...editedHotel, [name]: value });
        setErrors({ ...errors, [name]: '' });
      };



      const validateForm = () => {
        const newErrors = {};
    
        if (!editedHotel.hotelName.trim()) {
          newErrors.hotelName = 'Hotel Name is required';
        }
        if (!editedHotel.location.trim()) {
            newErrors.location = 'Hotel Loaction is required';
          }
          if (!editedHotel.images.trim()) {
            newErrors.images = 'images is required';
          }
          if (!editedHotel.address.trim()) {
            newErrors.address = 'Address is required';
          }
          if (!editedHotel.email.trim()) {
            newErrors.email = 'Email is required';
          }
          if (!editedHotel.description.trim()) {
            newErrors.description = 'Description is required';
          }
    
        return newErrors;
      };

      const updateHotel = async (e) => {
        e.preventDefault();
    
        if (validateForm()) {
          try {
            const token = localStorage.getItem('token');
            const headers = {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            };
    
            const response = await axios.put(
              `https://www.emoh.tech/api/admin/hotel/${hotelData.hotelId}`,
              editedHotel,
              { headers }
            );
    
            if (response.status === 200) {
              console.log('Hotel Updated Successfully');
              setMsg('Hotel Updated Successfully');
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Hotel has been updated",
                showConfirmButton: false,
                timer: 1500
              });
              if (onSuccess) {
                onSuccess();
              }
    
              setEditedHotel({ ...hotelData });
              onClose();
            } else {
              console.error('Failed to update hotel details:', response.statusText);
              setMsg('Failed to update hotel. Please try again.');
            }
          } catch (error) {
            console.error('Error updating hotel details:', error.message);
            setMsg('Error updating hotel details. Please try again.');
          }
        }
      };
    
      useEffect(() => {
        setEditedHotel({ ...hotelData });
        setMsg('');
        setErrors({});
      }, [hotelData]);



  return (
    <div>
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'transparent',
          },
          content: {
            border: 'none',
            background: 'transparent',
            overflowY: 'scroll',
            height: 'auto',
          },
        }}
      >
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <div className='bg-white p-3 rounded w-50 shadow'>
            <h2 className='text-center mb-3'>Edit Hotel</h2>
            {msg && (
              <p className='text-center text-success font-weight-bold'>
                {msg}
              </p>
            )}
            <form
              className='w-full max-w-lg'
              onSubmit={(e) => updateHotel(e)}
            >
              <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="hotelName">
                        Hotel Name:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="hotelName" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={editedHotel.hotelName}/>
                      {errors.hotelName && <p className="text-danger">{errors.hotelName}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="location">
                        Location
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="location" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={editedHotel.location}/>
                      {errors.location && <p className="text-danger">{errors.location}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
                        Mobile Number:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="phone" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={editedHotel.phone}/>
                      {errors.phone && <p className="text-danger">{errors.phone}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="images">
                        images:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="images" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={editedHotel.images}/>
                      {errors.images && <p className="text-danger">{errors.images}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="email">
                        Email:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="email" type="email" placeholder="..." onChange={(e) => handleChange(e)} value={editedHotel.email}/>
                      {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="price">
                        Price:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="price" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={editedHotel.price}/>
                      {errors.price && <p className="text-danger">{errors.price }</p>}
                    </div>
                  </div>


                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="address">
                        Address:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="address" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={editedHotel.address} />
                      {errors.address && <p className="text-danger">{errors.address}</p>}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
                        description:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="description" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={editedHotel.description} />
                      {errors.address && <p className="text-danger">{errors.address}</p>}
                    </div>
                  </div>

              <div className='d-flex justify-content-between'>
                <button type='submit' className='btn btn-primary btn-block'>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default EditHotelModal
