import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
function UserReview() {
    const [userReviews, setUserReviews] = useState([]);
    const token = localStorage.getItem('token');
    const userId = parseInt(localStorage.getItem('userId'), 10); // Convert userId to number if needed

    useEffect(() => {
        const fetchUserReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/userReviewss/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUserReviews(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching user reviews:', error);
            }
        };

        fetchUserReviews();
    }, [token, userId]);
    
  return (
    <div className=" mx-auto px-4">
    <Navbar />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {userReviews.map((review, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <img className="h-48 w-full object-cover mb-4 rounded" src={review.image} alt={review.hotelName} />
                <h2 className="text-xl font-bold mb-2">{review.title}</h2>
                <p className="text-gray-700 mb-4">{review.description}</p>
                <div className="flex items-center justify-between">
                    <span className="text-gray-700">{review.hotelName}</span>
                    <div className="flex items-center">
                        <span className="text-yellow-500 mr-2">★</span>
                        <span>{review.rating}</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
  )
}

export default UserReview
