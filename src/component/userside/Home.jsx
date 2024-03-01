import React, { useEffect } from 'react'
import { useState } from 'react';
import Navbar from './Navbar';
import SliderInPlace from './SliderInPlace';
import axios from 'axios';
import Slider from 'react-slick';
import Swal from 'sweetalert2';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Home.css'
import { Link } from 'react-router-dom';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import BannerInHomePage from './BannerInHomePage';
import SearchDate from './SearchDate';
import SliderInDifferentCategory from './SliderInDifferentCategory';

function Home() {
    const[hotel,setHotel]=useState([]);
    const [notifications, setNotifications] = useState([]);
     
      useEffect(() => {
        const fetchAllHotel = async () => {
          try {
            const response = await axios.get('https://www.emoh.tech/api/user/hotelList');
            if (response.status >= 200 && response.status < 300) {
              setHotel(response.data);
            }
          } catch (error) {
            console.error('Error fetching hotel data:', error);
          }
        };
        fetchAllHotel();
      const urlParams = new URLSearchParams(window.location.search);
      const sessionIdFromUrl = urlParams.get('session_id');
    if (sessionIdFromUrl) {
      const formData = JSON.parse(localStorage.getItem('formData'));
      if (formData) {
       
        const bookingStored = localStorage.getItem('bookingStored');
        storeBookingData(formData);
        if (!bookingStored || bookingStored !== 'true') {
          Swal.fire("Room is booked!");
         
        } else {
          console.log('Booking already stored.');
        }
    }
  }
 
  }, []);
  const storeBookingData = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://www.emoh.tech/api/onlineBooking', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Booking data stored successfully:', response.data);
      localStorage.setItem('bookingStored', 'true');
    } catch (error) {
      console.error('Error storing booking data:', error);
      // Handle error gracefully, show user feedback or retry storing data
    }
  };
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4, // Adjust the number of slides to show
      slidesToScroll: 1,
      autoplay:true,
        autoplaySpeed:  2000, // Set the speed of autoplay in milliseconds
        cssEase: 'linear',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }; 
  return (
   <div className=' overflow-x-hidden'>
           <Navbar notifications={notifications} />
           
           <div className="w-full md:w-1/4 h-10 text-slate-800 text-4xl font-medium font-['Roboto'] leading-10 md:ml-5 mt-4 hidden md:block">
            Where to?
          </div>
           <SearchDate/> 
           <BannerInHomePage/>
           <SliderInDifferentCategory/>
           <SliderInPlace/>
         
<section>
<div className='ml-3' >
    <h3 className="w-1/2 text-slate-800  font-medium font-['Roboto'] leading-loose">Get away this weekend</h3>
</div>
<div>
<Slider {...settings} className='ml-5 custom-slider'>
      {hotel.map((hotelItem, index) => (
       <Link to={`/userHotelList/${hotelItem.hotelId}`} key={index} className='w-1/4 h-96  mr-4 overflow-hidden no-underline bg-white rounded-lg shadow-md hover:shadow-2xl transition duration-500 ease-in-out'> 
          <img
            src={hotelItem.images}
            alt={`Hotel ${index + 1}`}
            style={{ objectFit: 'cover', width: '90%', height: '50%' }} className='rounded-tl-2xl rounded-tr-2xl mx-2'
          />
          <div className='h-8'>
            <span className='pl-2 text-black mt-2'>8.0/10 <span className='font-thin text-sm'>Very good</span> </span>
          <div className='text-black ml-2 mt-1 font-serif font-semibold'>{hotelItem.hotelName}</div>
          <div className='text-black ml-2 font-semiboldmt-4'>{hotelItem.location}</div>
          <div className='  text-black ml-2 text-xl '>₹{hotelItem.price} <sup><del>₹5000</del></sup></div> 
          <div className='text-black text-xs ml-2'>per night</div>
          <div className='text-black text-xs ml-2'>including & taxes</div>
          <div className="bg-purple-500 w-24 h-6 mt-2 ml-2 rounded-md">
              <FontAwesomeIcon icon={faTag} className='pl-2' style={{ color: 'white' }} />
              <span className='pl-2 ' style={{color:'white'}}>20 <sup>% off</sup></span>
          </div>
          </div>
        </Link>
      ))}
    </Slider>
</div>
</section>
<Footer/>
  </div>
  )
}
export default Home;
