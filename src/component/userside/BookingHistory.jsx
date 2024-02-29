import React from 'react'
import Navbar from './Navbar'
import { useState,useEffect } from 'react'
import axios from 'axios';
function BookingHistory() {
    const [bookings, setBookings] = useState([]);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        const postBooking = async () => {
            try {
                const response = await axios.post(
                    `https://www.emoh.tech/api/userBookingList/${userId}`,
                    {}, // Request body should be here
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                if (response.status >= 200 && response.status < 300) {
                    // Handle the response data
                    console.log(response.data);
                    setBookings(response.data);
                }
            } catch (error) {
                console.error('Error posting booking:', error);
            }
        };

        postBooking();
    }, [userId]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

  return (
    <div>
        <Navbar/>
        <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Booking History</h1>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div key={index} className="border-b border-gray-200 py-4">
                        <div className="flex justify-between items-center">
                            <div className="w-10/12">
                            <h2 className="text-xl font-semibold">{booking.hotelName}</h2>
                            <p className="text-gray-600">{booking.address}</p>
                            <div className="flex justify-between mt-2">
                                <div className="flex flex-col">
                                <span className="text-sm font-semibold">Booking ID:</span>
                                <p className="text-gray-600">{booking.booking_id}</p>
                                </div>
                                <div className="flex flex-col">
                                <span className="text-sm font-semibold">Check In Date:</span>
                                <p className="text-gray-600">{formatDate(booking.checkInDate)}</p>
                                </div>
                                <div className="flex flex-col">
                                <span className="text-sm font-semibold">Check Out Date:</span>
                                <p className="text-gray-600">{formatDate(booking.checkOutDate)}</p>
                                </div>
                                <div className="flex flex-col">
                                <span className="text-sm font-semibold">Room Type:</span>
                                <p className="text-gray-600">{booking.roomType}</p>
                                </div>
                                <div className="flex flex-col">
                                <span className="text-sm font-semibold">Room Number:</span>
                                <p className="text-gray-600">{booking.roomNumber}</p>
                                </div>
                                <div className="flex flex-col">
                                <span className="text-sm font-semibold">Price:</span>
                                <p className="text-gray-600">{booking.totalPrice}</p>
                                </div>

                            </div>
                            </div>
                            <div className="text-right">
                            {/* <div>
                                <p className="text-sm font-semibold text-gray-600">Total:</p>
                                <p className="text-gray-600">{booking.totalPrice}</p>
                            </div> */}
                            {/* <div>
                                <p className="text-sm font-semibold text-gray-600">Status:</p>
                                <p className="text-gray-600">{booking.paymentStatus}</p>
                            </div> */}
                            <div className="flex flex-col mt-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Cancel
                                </button>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2">
                                Delete
                                </button>
                            </div>
                            </div>
                        </div>
        </div>
      ))
    ) : (
      <p className="text-gray-600">No bookings found.</p>
    )}
  </div>
</div>


      
    </div>
  )
}

export default BookingHistory

