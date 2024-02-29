import React from 'react'
import { useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
const AddHotelModal=({isOpen,onSuccess})=> {
    const[hotel,setHotel]=useState({
        hotelName:'',
        email:'',
        phone:'',
        address:'',
        description:'',
        images:'',
        location:'',
    });
const [msg,setMsg]=useState('');
const [errors,setErrors]=useState({});

const handleChange=(e)=>{
    const {name,value}=e.target;
    setHotel({...hotel,[name]:value});
    setErrors({...errors,[name]:""})
};

const validateForm = () => {
    const newErrors = {};
  
    if (!hotel.hotelName.trim()) {
      newErrors.hotelName = "Hotel Name is required";
      console.log("ashrfa is a good boy")
    }
  
    if (!hotel.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(hotel.email)) {
      newErrors.email = "Invalid email format";
    }
  
    if (!hotel.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]+$/.test(hotel.phone)) {
      newErrors.phone = "Invalid phone number";
    }
  
    if (!hotel.address.trim()) {
      newErrors.address = "Address is required";
      
    }
  
    if (!hotel.description.trim()) {
      newErrors.description = "Description is required";
    }
  
    if (!hotel.images.trim()) {
      newErrors.images = "Images are required";
    }
 
    // Add additional validation rules as neededhote
  
    return newErrors;
  };


  const RegisterUser = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const errors = validateForm(); // Validate the form and get errors

    if (Object.keys(errors).length === 0) { // Check if there are no errors
        try {
            // Proceed with form submission
            const token = localStorage.getItem('token');
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            };
            const hotelWithUserId = {
                ...hotel,
                userId: userId,
            };
            const response = await axios.post('https://www.emoh.tech/api/admin/savehotel', hotelWithUserId, { headers });

            if (response.status === 200) {
                console.log("Hotel Added Successfully");
                setMsg("Hotel Added Successfully");
                if (onSuccess) {
                    onSuccess();
                }
                setHotel({
                    hotelName: '',
                    email: '',
                    phone: '',
                    address: '',
                    description: '',
                    images: '',
                    location: '',
                    price: '',
                });
            } else {
                setMsg('Failed to add hotel. Please try again.');
            }
        } catch (error) {
            console.error('Error adding hotel:', error.message);
            if (error.response && error.response.status === 400 && error.response.data) {
                setMsg(error.response.data);
            } else {
                console.log(error);
            }
        }
    } else {
        // Handle form validation errors here
        console.log("Form validation failed", errors);
        Swal.fire("complete the form !");
        // Display error messages to the user and highlight the fields with errors
    }
};

  

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
        // Remove padding
      
    },
  }}
>
<div>
        
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <div className='bg-white p-3 rounded w-50 shadow'>
            <h2 className="text-center mb-3">Add Hotel</h2>
            {msg && <p className="text-center text-success font-weight-bold">{msg}</p>}
              <form className="w-full max-w-lg" onSubmit={(e) => RegisterUser(e)}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      {errors.hotelName}
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="hotelName">
                        Hotel Name:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="hotelName" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={hotel.hotelName}/>
                      {errors.hotelName && <p className="text-danger">{errors.hotelName}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="location">
                        Location
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="location" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={hotel.location}/>
                      {errors.location && <p className="text-danger">{errors.location}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
                        Mobile Number:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="phone" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={hotel.phone}/>
                      {errors.phone && <p className="text-danger">{errors.phone}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="images">
                        images:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="images" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={hotel.images}/>
                      {errors.images && <p className="text-danger">{errors.images}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
                        Email:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="email" type="email" placeholder="..." onChange={(e) => handleChange(e)} value={hotel.email}/>
                      {errors.email && <p className="text-danger">{errors.email}</p>}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="images">
                        Price:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="price" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={hotel.price}/>
                      {errors.price && <p className="text-danger">{errors.price}</p>}
                    </div>
                  </div>


                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="address">
                        Address:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="address" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={hotel.address} />
                      {errors.address && <p className="text-danger">{errors.address}</p>}
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="description">
                        description:
                      </label>
                      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="description" type="text" placeholder="..." onChange={(e) => handleChange(e)} value={hotel.description} />
                      {errors.description && <p className="text-danger">{errors.description}</p>}
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                      <button type="submit" className='btn btn-primary btn-block'>Add</button>
                
                   </div>

                </form>
          </div>
        </div>
        
      </div>
    </Modal>








      
    </div>
  )
}


export default AddHotelModal;
