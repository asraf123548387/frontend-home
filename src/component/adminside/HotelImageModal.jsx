import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';

function HotelImageModal({ isOpen, onClose, hotelId }) {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleImageUpload = async () => {
    setLoading(true);
    setErrorMsg('');

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/hotel/image/${hotelId}`,
         imageUrl ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Image URL uploaded successfully');
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your image is uploded",
            showConfirmButton: false,
            timer: 1500
          });
        onClose();
      }
    } catch (error) {
      console.error('Error uploading image URL:', error);
      setErrorMsg('Failed to upload image URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)', // Transparent background
    },
    content: {
      border: 'none', // Remove border
      background: 'none', // Remove background
      top: '15%',
      left: '80%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <h2 className="text-lg font-semibold mb-2">Upload Hotel Image URL</h2>
      <input type="text" value={imageUrl} onChange={handleImageUrlChange} className="mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
      <button disabled={loading} onClick={handleImageUpload} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? 'Uploading...' : 'Upload'}
      </button>
      {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
    </Modal>
  );
}

export default HotelImageModal;
