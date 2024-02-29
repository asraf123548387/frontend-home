import React from 'react'
import { useState } from 'react'

function AddReviewModal({isOpen,onRequestClose,onSubmit}) {
    const [review,setReview]=useState({ title: '', description: '', rating: 0 });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...review });
        setReview({ title: '', description: '', rating: 0 });
      };
  return (
    <div className={`fixed inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
        <div className="relative bg-white rounded-lg px-4 py-8 w-full max-w-md">
          <div className="absolute top-0 right-0 -mr-4 -mt-4">
            <button onClick={onRequestClose} className="text-gray-400 hover:text-gray-500">
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h1 className="text-2xl font-bold text-center mb-4">Add Review</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-8"
                value={review.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-8"
                    value={review.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md h-8"
                    value={review.rating}
                    onChange={handleChange}
                    required
                />
                </div>


            {/* Add other input fields (description, rating) here */}
            <button className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddReviewModal

