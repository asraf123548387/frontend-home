import React, { useEffect, useState} from 'react'
import { useParams} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useAverageRating } from '../../contextapi/averageRatingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon,faUser,faBed,faCar,faPersonSwimming ,faBanSmoking,faDumbbell, faLock,faBook} from '@fortawesome/free-solid-svg-icons';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51Ok3CgSAIRBLhMStVbXJTBobaktYYPnRcqV3eErOIFeYRAdP0D0ng6jvHfPz80cVwG8Xtr6G3kzVR7hJ029uvhIW00GIeV3x1j');
function CheckOut() {

    
    const {roomId} =useParams();
    const userId = localStorage.getItem('userId');
    const [roomDetails,setRoomDetails]=useState([]);
    const [hotelDetails,setHotelDetails]=useState([]);
    const { averageRating } = useAverageRating();
    const [isModalOpen,setIsModalOpen]=useState(false);
 
    const openModal = (event) => {
      event.preventDefault();
     
      // Initialize an empty object to collect validation errors
      const errors = {};
     
      // Iterate over each field in the form data
      Object.keys(formData).forEach(field => {
         // Validate the field and collect the error message
         const errorMessage = validateField(field, formData[field]);
         // If there's an error message, add it to the errors object
         if (errorMessage) {
           errors[field] = errorMessage;
         }
      });
     
      // Check if there are any errors
      if (Object.keys(errors).length > 0) {
         // Convert the errors object into a string to display in the alert
         const errorText = Object.values(errors).join(', ');
     
         Swal.fire({
           icon: "error",
           title: "Oops...",
           text: `Please correct the following errors: ${errorText}`,
         });
         return;
      }
     
      // If there are no errors, open the modal
      setIsModalOpen(true);
     };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handlePayAtProperty = () => {
      // Logic for cash on delivery payment
      const token=localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.post('https://www.emoh.tech/api/roomBooking', formData, { headers })
      .then(response => {
        // Handle successful response
        console.log('Payment successful:', response.data);
        Swal.fire("Room is booked!,Please look in the booking history for additional details");
        closeModal();
      })
      .catch(error => {
        // Handle error
        console.error('Error making payment:', error);
      });
    };




    const today =new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formattedToday = today.toISOString().substr(0, 10);
    const formattedTomorrow = tomorrow.toISOString().substr(0, 10);
    // this use state is used to handle the data of User
      const [formData,setFormData]=useState({
        guestName:'',
        email:'',
        mobileNumber:'',
        checkInDate:formattedToday,
        checkOutDate:formattedTomorrow,
        totalPrice:0,
        roomId:roomId,
        userId:userId,



      });

      const token = localStorage.getItem('token');

     
      
      const handlePayment = async () => {
        try {
          const stripe = await stripePromise;
          const amount = formData.totalPrice; // Assuming formData is defined elsewhere
          localStorage.setItem('formData', JSON.stringify(formData));
          const response = await axios.post('https://www.emoh.tech/api/payments/create-checkout-session', {
            amount: amount
          }, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          // storeBookingData();
          const { sessionId } = response.data; // Assuming sessionId is returned from the backend
      
          // Redirect to Stripe Checkout page with sessionId
          const { error } = await stripe.redirectToCheckout({
            sessionId: sessionId
          });
      
            
          
          
        } catch (error) {
          console.error('Error initiating payment:', error);
          // Handle error gracefully, show user feedback or retry payment
        }
      };
 
    useEffect(() => {
      const checkInDate = new Date(formData.checkInDate);
      const checkOutDate = new Date(formData.checkOutDate);
      const numberOfNights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const totalPrice = roomDetails.pricePerNight * numberOfNights;
    
      setFormData(prevState => ({
        ...prevState,
        totalPrice: totalPrice
      }));
    }, [formData.checkInDate, formData.checkOutDate, roomDetails.pricePerNight]);
    const validateField = (name, value) => {
      switch (name) {
         case 'guestName':
           // Check if the name is provided and has a minimum length
           return value && value.length >= 2 ? '' : 'Name is required and must be at least 2 characters long';
         case 'email':
           // Check if the email is in a valid format and is not too long
           const emailRegex = /\S+@\S+\.\S+/;
           const emailLength = 254; // Maximum length for an email address
           return emailRegex.test(value) && value.length <= emailLength ? '' : 'Invalid email address or exceeds maximum length';
         case 'mobileNumber':
           // Check if the mobile number is provided and is in a specific format (e.g., 10 digits)
           const mobileNumberRegex = /^\d{10}$/; // Example: exactly 10 digits
           return value && mobileNumberRegex.test(value) ? '' : 'Mobile number is required and must be 10 digits';
         default:
           return '';
      }
     };
    // Event handler function to update form data
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
    
  };
  

    const userName=localStorage.getItem('userName');
   const Navigate=useNavigate();
    useEffect(()=>{
        const token=localStorage.getItem('token');

        if(!token){
            Navigate('/login')
            Swal.fire("please sign In !");
        }else{
        axios.get(`https://www.emoh.tech/api/userCheckOut/getRoom/${roomId}`,
        {
            headers: {
                Authorization: `Bearer ${token}` // Include token in request headers
            }
        })
        .then(response => {
            setRoomDetails(response.data);
            console.log(response.data);
            // Fetch hotel details based on the room
            axios.get(`https://www.emoh.tech/api/userCheckOut/getHotel/${response.data.hotelId}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token in request headers
                }
            })
            .then(response => setHotelDetails(response.data))
         
            .catch(error => console.error('Error fetching hotel details:', error));
        })
        .catch(error => console.error('Error fetching room details:', error));
}}, [roomId]);


  return (


    <div>
      <Navbar />

      <section className='bg-slate-100'>
        <div className='pl-10 text-3xl font-semibold pt-3'>
          {hotelDetails.hotelName}
          
        </div>
        <div className='flex w-full'> 
            <div className='w-4/6 '>
                <div className='bg-white  my-4 ml-5 border border-gray-400 rounded-md h-16 '>
                    <div className='mt-3 pl-5 font-semibold text-2xl'>
                      <span><FontAwesomeIcon icon={faMoon}  className='w-12 h-10'/> Welcome, {userName}</span> 
                    </div>
                </div>

               <div className='bg-white  mt-4 ml-5 rounded-lg h-auto border border-gray-400'>
                    <div className='pl-5 py-3  flex'>
                                <div >
                                <FontAwesomeIcon icon={faUser}  className='w-7 h-7'/>
                                </div>
                                <div className='pl-4 font-semibold text-2xl '>
                                    Step 1 : Your Details
                                   
                                </div>
                                
                    </div>
                    <hr></hr>
                    <div className='pl-5  text-base'>
                         Please tell us the name of the guest staying at the hotel as it appears on the ID that they’ll present at check-in. If the guest has more than one last name, please enter them all.
                        
                    </div>
                  
                    <div className='pt-3'>
                    
                          <div className='pl-5'>
                            <label className='font-bold text-lg'>Your name *</label>
                            <p className='text-lg font-thin'>Please give us the name of one of the people staying in this room.</p>
                            <input type='text' className='border border-black w-3/6 h-10' name="guestName" value={formData.guestName} onChange={handleChange} />
                            
                          </div>
                        
                          <div className='pl-5 mt-4'>
                            <label className='font-bold text-lg'>Email * :</label>
                            <p className='text-lg font-thin'>Your confirmation email goes here.</p>
                            <input type='text' className='border border-black w-3/6 h-10' name="email" value={formData.email} onChange={handleChange} />
                          </div>
                          <div className='pl-5 mt-4 mb-3'>
                            <label className='font-bold text-lg'>Mobile Number * :</label>
                            <p className='text-lg font-thin'>Please provide your contact phone number.</p>
                            <input type='text' className='border border-black w-3/6 h-10' name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
                          </div>
                        


                    </div>


               </div>


               <div className='bg-white  my-4 ml-5 rounded-lg h-auto border border-gray-400'>
                   <div className='pl-5 py-3  flex'>
                                <div >
                                <FontAwesomeIcon icon={faBed} className='w-7 h-7'/>
                                </div>
                                <div className='pl-4 font-semibold text-2xl '>
                                    Step 2 : Room Details
                                </div>
                                
                    </div>
                    <hr>
                    </hr>
                   <div className='pl-5'>
                      <div className=' text-lg font-bold'>
                        Property Highlight
                      </div>
                      <div className='mt-2 flex justify-between pr-4'>
                          <span ><FontAwesomeIcon icon={faCar} className='pr-2'/> Free CarParking</span> 
                          <span className='pl-5'><FontAwesomeIcon icon={faPersonSwimming} className='pr-2'/> Swimming pool</span> 
                          <span className='pl-5'><FontAwesomeIcon icon={faBanSmoking}  className='pr-2'/>No Smoking  </span> 
                          <span className='pl-5'><FontAwesomeIcon icon={faDumbbell}   className='pr-2'/>Gym  </span> 
                      </div>
                       <div className='mt-4 font-bold'>
                        ROOM TYPE:{roomDetails.roomType}
                       </div>
                       <div className='flex justify-between'>
                       <div className='mt-4 font-bold mb-5'>
                        Room price: ₹ {formData.totalPrice}
                       </div>
                       <div className='pt-4 pr-10 '>
                       <button className='bg-blue-600 w-24 text-white p-2 text-xl rounded-2xl' onClick={openModal}>
                         <FontAwesomeIcon icon={faBook} className='pr-2' /> Book
                       </button>

                          {isModalOpen && (
                          <div className='flex justify-center h-screen'>
                            <div className="fixed left-auto right-auto   w-2/5  z-10  inset-0 overflow-y-auto">
                              <div  className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                                  <p  className="mt-8 text-lg font-medium"> <FontAwesomeIcon icon={faLock} className='w-7 h-7 px-2'/>Payment Methods</p>
                              <form  className="mt-5 grid gap-6">

                                      <div  className="relative">
                                
                                                    <button onClick={closeModal} type="button" className="bg-white   rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    </button>

                                                  <input onClick={handlePayAtProperty} className="peer hidden" id="radio_1" type="radio" name="radio" checked />
                                                  <span  className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                                  <label  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
                                                  <img  className="w-14 object-contain" src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/05/cashondelivery1.jpg" alt="" />
                                                  <div  className="ml-5">
                                                      <span  className="mt-2 font-semibold">Pay At hotel</span>
                                                   
                                                  </div>
                                                  </label>
                                    </div>
                                    <div  className="relative">
                                            <input onClick={handlePayment} className="peer hidden" id="radio_2" type="radio" name="radio" checked />
                                            <span  className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                                            <label  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
                                            <img  className="w-14 object-contain" src="https://chartmogul.com/blog/wp-content/uploads/2020/12/why_stripe_popular_blog-scaled.jpeg" alt="" />
                                            <div  className="ml-5">
                                                <span  className="mt-2 font-semibold">Online Payment</span>
                                                <p  className="text-slate-500 text-sm leading-6">Go though strip payment</p>
                                            </div>
                                            </label>
                                    </div>
                            </form>

                            </div>
                            </div>
                            </div>
                          )}
                      </div>
             </div>




            </div>


        </div>
            </div>
            <div className='w-2/6 hidden md:block'>      
               <div>
                   <div className='h-auto bg-white mx-3 p-2 rounded-lg'>
                      <div className='p-2 bg-slate-200 rounded-lg'>
                        <div>
                          <img src={hotelDetails.images} className='w-full rounded-lg' alt='hello'/>
                        </div>
                        <div className='pt-3 font-semibold text-xl'>
                          {hotelDetails.hotelName}
                        </div>
                        <div className='pt-2 font-medium '>
                            {hotelDetails.address}
                        </div>
                        <div className='font-bold text-3xl p-4'>
                           
                                Rating: {averageRating}/10
                        </div>
                         <div className='bg-white p-3 rounded-lg'>
                         <div className='text-lg font-bold flex justify-between'>
                              <div className='w-1/2'>
                                  <label className='w-full'>Check In date:</label>
                              </div>
                              <div className='w-1/2'>
                                <span>  <input className='w-full' defaultValue={formattedToday}  name='checkInDate'  onChange={handleChange} type='date' readOnly/>12 pm</span>
                              </div>
                          </div>
                          <div className='text-lg font-bold flex justify-between'>
                              <div className='w-1/2'>
                                  <label className='w-full'> Check Out Date:</label>
                              </div>
                              <div className='w-1/2'>
                                 <span> <input type="date" defaultValue={formattedTomorrow} onChange={handleChange} name='checkOutDate' min={formattedTomorrow}/>12 pm</span>
                              </div>
                          </div>
                          
                      </div>

                      </div>
                   </div>
               </div>
            </div>
          

        </div>
      </section>
    <Footer/>















    </div>
  )
}

export default CheckOut;
