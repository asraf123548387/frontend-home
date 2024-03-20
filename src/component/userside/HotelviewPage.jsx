import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import { FaHeart } from 'react-icons/fa';
import Footer from './Footer';
import Spinner from './Spinner';
import { useAverageRating } from '../../contextapi/averageRatingContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi,faSquareRss,faWater,faBed,faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import AddReviewModal from './AddReviewModal';


function HotelviewPage() {
  const { averageRating, setAverageRating } = useAverageRating();

  const navigate=useNavigate();
  const {hotelId}=useParams();
  const [images,setImages]=useState([]);
  const [hotelDetails,setHotelDetails]=useState([]);
  const [rooms,setRooms]=useState([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true); // State variable for images loading state
  const [isLoadingHotelDetails, setIsLoadingHotelDetails] = useState(true); // State variable for hotel details loading state
  const [isLoadingRooms, setIsLoadingRooms] = useState(true); 
  const [isModalOpen,setIsModalOpen]=useState();
  const [reviews,setReviews]=useState([]);
  
  const [totalReviews, setTotalReviews] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const userId = localStorage.getItem('userId');
  // for reviews adding
  const openModal = () => {
    setIsModalOpen(true);

  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewSubmit = (review) => {
    const token =localStorage.getItem('token');
    if(!token){
      navigate('/login')
      return;
    }
    // Add userId and hotelId to the review data
    const reviewData = {
      ...review,
      userId: userId,
      hotelId: hotelId
    };

    const headers = {
      Authorization: `Bearer ${token}`
    };
    axios.post('https://www.emoh.tech/api/userReviews', reviewData, { headers })
    .then(response => {

            axios.get(`https://www.emoh.tech/api/user/reviewsListByHotel?hotelId=${hotelId}`)
                    .then(response => {
                        setReviews(response.data);
                        const totalRating = response.data.reduce((acc, curr) => acc + curr.rating, 0);
                        const avgRating = totalRating / response.data.length;
                        setAverageRating(avgRating);
                        setTotalReviews(response.data.length);
                    })
                    .catch(error => {
                        console.error('Error fetching reviews:', error);
                    });



      Swal.fire("Review is added");
      closeModal();
    })
    .catch(error => {
      console.error('Error submitting review:', error);
      // Handle error
    });

    // Send reviewData to backend here
    console.log('Submitted review:', reviewData);
    closeModal();
  };
  

// this is  fetch hotel image 
  useEffect(()=>{
    // const token = localStorage.getItem('token'); 

    const fetchImages = async () => {
        try {
          const response = await axios.get(`https://www.emoh.tech/api/user/hotelImages/${hotelId}`);

          setImages(response.data);
          setIsLoadingImages(false); 
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
  
      fetchImages();
    }, [hotelId]);


// this is for retriving the hoteldetails  of selection  user 
    useEffect(()=>{
     const fetchHotelDetails = async()=>{
        try{
            const response =await axios.get(`https://www.emoh.tech/api/user/hotelSingle/${hotelId}`);
            setHotelDetails(response.data);
            setIsLoadingHotelDetails(false);

        }catch(error){
            console.log('error fetching hotel details:',error);

        }
     };
     fetchHotelDetails();
    },[hotelId]);

 // the below code is for retriving  the room details
  useEffect(()=>{
    const fetchRooms =async()=>{
        try{
            const response =await axios.get(`https://www.emoh.tech/api/user/hotelRooms/${hotelId}`)
            setRooms(response.data);
            setIsLoadingRooms(false);
            console.log(response.data)
         
        }catch(error){
            console.error('Error fetching hotel room:',error);
        }
    };
    fetchRooms();
  },[hotelId]);


  useEffect(() => {
    axios.get(`https://www.emoh.tech/api/user/reviewsListByHotel?hotelId=${hotelId}`)
      .then(response => {
        setReviews(response.data);
        const totalRating = response.data.reduce((acc, curr) => acc + curr.rating, 0);
        const avgRating = totalRating / response.data.length;
        setAverageRating(avgRating);
        setTotalReviews(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [hotelId,setAverageRating]);

  if (isLoadingImages || isLoadingHotelDetails || isLoadingRooms) {
    return <Spinner />;
  }



  const handleWishlistClick = async () => {
    // Toggle the state
    setIsInWishlist(!isInWishlist);

    // Retrieve userId and token from local storage
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    // Send a request to the backend to add the hotel to the wishlist
    try {
        const response = await axios.post('https://www.emoh.tech/api/wishlist/add', {
            userId: userId,
            hotelId: hotelId,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include the token for authentication
            },
        });

        // Handle the response
        if (response.status ===  200) {
            console.log('Successfully added to wishlist');
            Swal.fire(" Added in  wishlist!");
        } else {
            console.error('Failed to add to wishlist');
        }
    } catch (error) {
        // Handle the error
        if (error.response && error.response.status ===  400) {
          Swal.fire("Already added in  wishlist!");
            console.error('Bad Request:', error.response.data);
        } else {
            console.error('Failed to add to wishlist', error);
        }
    }
};

  return (
 <div className='bg-slate-100 overflow-x-hidden'>
      <Navbar/>


  <section className='flex mt-2'>
                    <div className='hidden sm:block w-1/12' >

                    </div>
                    <div className='grid grid-cols-2 w-7/12 md:w-10/12 h-80 gap-1 '>
                    <div className='w-96 md:w-full h-80 mt-0.5 relative ml-3 md:ml-0'>
                                    {images.length >= 1 && (
                                        <>
                                            <img src={images[0]} alt="1" className='w-full h-full rounded-2xl' />
                                            {/* Wishlist button */}
                                            <button
                                                onClick={handleWishlistClick}
                                                className={`absolute top-2 right-2 bg-white rounded-full p-2 shadow-md ${isInWishlist ? 'text-red-500' : 'text-black'}`}
                                            >
                                                <FaHeart />
                                            </button>
                                        </>
                                    )}
                      </div>
                      <div className='hidden sm:grid grid-cols-2 w-full h-full gap-1'>
                          {images.slice(1,  5).map((image, index) => (
                            <div key={index} className='w-full h-40'>
                              <img src={image} alt={`2 ${index +  2}`} className='w-full h-full rounded-2xl' />
                            </div>
                          ))}
                        </div>

                   </div>


      
 </section>

 <section className=' w-96 md:w-full h-72 flex flex-wrap ml-3 md:ml-0'>
  <div className='w-full md:w-1/12'></div>
  <div className='w-full md:w-10/12 bg-white rounded-2xl mt-2 flex flex-col md:flex-row'>
    <div className='w-full md:w-7/12 m-3'>
      {/* Hotel details */}
      <div className=' text-2xl  md:text-4xl text-gray-900 dark:text-black'>
        {hotelDetails.hotelName}
        <div className="m text-[#005ef6]  text-lg md:text-xl tracking-[2px]">
          ★★★★★
        </div>
      </div>
      <div className='text-lg text-gray-900'>
        {hotelDetails.address}
      </div>
      <div className='text-lg text-gray-900 dark:text-black'>
        {hotelDetails.location}
      </div>
      <div className='text-lg text-gray-900 dark:text-black mt-3'>
        ₹ {hotelDetails.price} <sup className='text-blue-600'>starting price</sup>
      </div>
    </div>

    <div className='w-96 md:w-4/12 flex justify-center ml-3 md:ml-0'>
      {/* Map iframe */}
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3843.76031316599!2d73.7528115751251!3d15.550974685055891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfea04229a4413%3A0x16642ee585558351!2sEstrela%20Do%20Mar%20Beach%20Resort%20-%20A%20Beach%20Property!5e0!3m2!1sen!2sin!4v1706595870808!5m2!1sen!2sin" className='w-full md:h-56 mt-3 rounded-2xl' title='ash'></iframe>
    </div>
  </div>
</section>

<section className='mt-60 md:mt-0'>
  <div className='flex flex-wrap'>
    <div className='w-full md:w-1/12 hidden sm:block '></div>
    <div className='w-96 md:w-10/12 bg-white rounded-2xl mt-2 flex flex-col md:flex-row ml-3 md:ml-0'>
      <div className='m-4 text-base font-serif'>
        <div className=''>
          {hotelDetails.description}
        </div>
        <div className='flex justify-end mt-4 md:mt-0'>
          <button className="rounded-2xl bg-blue-700 text-white w-full md:w-32 h-7 hover:bg-blue-600 border border-black border-solid">Reserve</button>
        </div>
      </div>
    </div>
  </div>
</section>

<h2 className='md:ml-28'>Choose Your Room</h2>

 <section className='flex'> 

    <div className='w-1/12 hidden sm:block'>

    </div>
  <div className='w-full md:w-10/12 mt-2 flex flex-col md:flex-row flex-wrap md:pl-7'>
    {rooms.map(room => (
      <div className='w-96 md:w-80 bg-white h-auto mr-4 rounded-2xl ml-3 md:ml-0'>
        <div className='bg-blue-800 rounded-tr-2xl rounded-tl-2xl'>
          <span className='ml-3 text-white'>popular among travellers</span>
        </div>

        <div key={room.roomId}>
          <div>
            <img src={room.images} alt={`Room ${room.roomNumber}`} className='h-auto' />
          </div>
          <div className='p-2'>
            <span className='pb-2'><FontAwesomeIcon icon={faWifi} className='pr-2' />Free wifi</span> <br />
            <span className='pb-2'><FontAwesomeIcon icon={faSquareRss} className='pr-2' />34 sqrt</span> <br />
            <span className='pb-2'><FontAwesomeIcon icon={faWater} className='pr-2' />Bay view</span> <br />
            <span className='pb-2'><FontAwesomeIcon icon={faBed} className='pr-2' />1 king bed and 1 Double Sofa bed</span>

          </div>
          <hr />
          <div className='pl-3'>
            <span>Room Number: {room.roomNumber}</span><br />
            <span>Room Type: {room.roomType}</span> <br />
            {/* <p>Availability: {room.availability ? 'Available' : 'Not Available'}</p> */}
            <span><FontAwesomeIcon icon={faRupeeSign} />: {room.pricePerNight}</span>

          </div>
          <div className='flex justify-end'>
            {room.availability ? (
              <Link to={`/checkOut/${room.roomId}`}>
                <button className='rounded-3xl bg-blue-600 text-white p-2 mb-3 mr-2 hover:bg-blue-700'> Reserve </button>
              </Link>
            ) : (
              <button disabled className='rounded-3xl bg-gray-400 text-white p-2 mb-3 mr-2 cursor-not-allowed'> Not Available </button>
            )}
        </div>
      </div>

    </div>
  ))}
</div>

 </section>
        <div className='ml-28 my-4 font-bold text-xl'>
            {/* Your existing code */}
            <button onClick={openModal} className=' rounded-3xl bg-blue-600 text-white p-2 mb-3 mr-2 hover:bg-blue-700'>Add Review</button>
            <AddReviewModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                onSubmit={handleReviewSubmit}
                
              />


          </div>
          
   <section className='flex flex-col md:flex-row'>
    <div className='flex'>
      <div className='w-1/12 hidden sm:block'>

      </div>
      <div className='w-96 md:w-10/12 bg-white rounded-2xl flex flex-col md:flex-row'>
           <div className='w-full md:w-3/6 flex justify-center pt-20'>
            <div className='font-bold text-4xl'>
              
              {averageRating}/10
            
            </div> 
            <div>
            <div className='font-bold pl-3 text-xl'>
               {averageRating > 8 ? <span>Excellent</span> : averageRating> 5 ? <span>Good</span> : null}
           </div>

              <div className='text-blue-600 pl-3 '>
              {totalReviews} reviews
              </div>
         
            </div>
           </div>
           <div className='w-full rounded-br-2xl rounded-tr-2xl p-3'>
                {showAllReviews ? (
                    reviews.map(review => (
                        <div key={review.reviewId}>
                            <h3>{review.title}</h3>
                            <p>{review.reviewDate}</p>
                            <p>{review.description}</p>
                            <p className='text-blue-500'>Rating: {review.rating}/10</p>
                            <p>By: {review.userName}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <>
                        {reviews.slice(0, 2).map(review => (
                            <div key={review.reviewId}>
                                <h3>{review.title}</h3>
                                <p>{review.reviewDate}</p>
                                <p>{review.description}</p>
                                <p className='text-blue-500'>Rating: {review.rating}/10</p>
                                <p>By: {review.userName}</p>
                                <hr />
                            </div>
                        ))}
                       <button onClick={() => setShowAllReviews(true)} className='text-blue-600 border rounded-2xl w-full md:w-36 h-12 border-black hover:text-blue-300'>See All Reviews</button>
                    </>
                )}
            </div>
      </div>

    </div>


 </section>
<Footer/>
    </div>
  )
}

export default HotelviewPage;
