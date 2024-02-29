import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './Navbar';

function Wishlist() {
    const[wishlist,setWishlist]=useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchWishlist = async () => {
          try {
            // Retrieve userId and token from local storage
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
    
            // Set the headers for the request
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            };
    
            // Make the API call to fetch the wishlist
            const response = await axios.get(`https://www.emoh.tech/api/wishlist/list/${userId}`, { headers });
    
            // Update the state with the fetched wishlist
            setWishlist(response.data);
            console.log(response.data)
            setLoading(false);
          } catch (err) {
            // Handle any errors
            setError(err.message);
            setLoading(false);
          }
        };
    
        fetchWishlist();
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }




  return (
    <div className="container mx-auto px-4">
    <Navbar/>
    <h1 className="text-3xl font-bold mt-8 mb-4">Your Wishlist</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {wishlist.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-md p-4">
          <img src={item.image} alt={item.hotelName} className="w-full h-48 object-cover rounded-md mb-2" />
          <h2 className="text-xl font-semibold mb-2">{item.hotelName}</h2>
          <p className="text-gray-600 mb-2">{item.place}</p>
          <p className="text-gray-800 font-bold">{item.price}</p>
          {/* Add buttons or links for actions like remove from wishlist */}
        </div>
      ))}
    </div>
  </div>
  )
}

export default Wishlist

