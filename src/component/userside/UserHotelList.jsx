import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'; 
import axios from 'axios';
import Footer from './Footer';
import SearchDate from './SearchDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

function UserHotelList() {
    const{hotelId}=useParams();
    const[currentPage,setCurrentPage]=useState(1); // mainly used to pagination 
    const[hotel,setHotel]=useState([]);
    const [isLoadingHotelDetails, setIsLoadingHotelDetails] = useState(true); // State variable for hotel details loading state
    const [sortOption, setSortOption] = useState(''); // State variable for sorting option
    const [searchQuery,setSearchQuery]=useState(''); // searching by the hotal name
    const[minPrice,setMinPrice]=useState(2000);
    const[maxPrice,setMaxPrice]=useState(5000);
    const itemsPerPage=4; //how many items are showing in this 
    useEffect(() => {
      const fetchAllHotel = async () => {
        try {
          const response = await axios.get('https://www.emoh.tech/api/user/hotelList');
    
          if (response.status >= 200 && response.status < 300) {
            setHotel(response.data);
            setIsLoadingHotelDetails(false);
          } else {
            console.error('Failed to fetch hotels:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching hotels:', error.message);
        }
      };
    
      fetchAllHotel();
    }, []);
  
    if (isLoadingHotelDetails) {
      return <Spinner />;
    }
 // Find the hotel with the matching hotelId
 const selectedHotel = hotel.find(hotelItem => hotelItem.hotelId === parseInt(hotelId));
// Filter out the selected hotel from the hotel array
const remainingHotels = hotel.filter(hotelItem => hotelItem.id !== parseInt(hotelId));

// Construct the sortedHotel array by placing the selected hotel at the beginning
const sortedHotel = selectedHotel ? [selectedHotel, ...remainingHotels] : hotel;

  // Sort the sortedHotel array based on the selected sort option
 // Assuming sortedHotel is your original list of hotels
const sortedHotelByOption = sortedHotel.slice().sort((a, b) => {
  if (sortOption === 'low to high') {
    return a.price - b.price;
  } else if (sortOption === 'high to low') {
    return b.price - a.price;
  } else if (sortOption === 'rating') {
    return a.rating - b.rating;
  }
});

// Apply filtering after sorting
const filteredHotels = sortedHotelByOption.filter(hotelItem =>
  hotelItem.hotelName.toLowerCase().includes(searchQuery.toLowerCase()) &&
  hotelItem.price >= minPrice && hotelItem.price <= maxPrice
);

// Pagination logic remains the same
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
filteredHotels.slice(indexOfFirstItem, indexOfLastItem);

const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);

// Pagination and sorting handlers remain the same
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const handleSortChange = (option) => {
  setSortOption(option.value);
};

const handleSearchChange = (event) => {
  setSearchQuery(event.target.value);
};


// below code is sort by hotel price 
const options = [
  { value: 'low to high', label: 'price:low to high' },
  { value: 'high to low', label: 'price:high to low' },
  { value: 'rating', label: 'guest rating' },
  
];

  return (
    <div className='bg-zinc-100'>
      <Navbar/>

      <SearchDate/>






      <section className='flex flex-wrap'>
  <div className='w-full md:w-4/12 p-4 md:p-8'>
    {/* Map iframe */}
    <div className='flex justify-center pt-14 md:pt-10'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d984962.9467283923!2d73.34722614574983!3d15.348759664324652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfba106336b741%3A0xeaf887ff62f34092!2sGoa!5e0!3m2!1sen!2sin!4v1707106860458!5m2!1sen!2sin" className='rounded-3xl w-full md:w-80'></iframe>
    </div>

    {/* Sort dropdown */}
    <div className='flex justify-center mt-10'>
      <div className='bg-white h-auto w-full md:w-80 mt-10'>
        <Dropdown
          options={options}
          value={options.find(option => option.value === sortOption)}
          onChange={(selectedOption) => handleSortChange(selectedOption)}
          placeholder="Sort by"
          menuPlacement="bottom"
          className='text-lg font-mono'
        />
      </div>
    </div>

    {/* Search by property name */}
    <div className='flex justify-center text-2xl font-bold mt-4'>
      Search By Property Name
    </div>
    <div className='flex justify-center mt-4'>
      <div className='w-full md:w-80 bg-white h-12 rounded-2xl flex'>
        <FontAwesomeIcon icon={faMagnifyingGlass} className='p-3' />
        <input
          className='pt-1 pl-3 outline-none font-bold'
          placeholder='e.g MARRIOT'
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
    </div>

    {/* Price per night */}
    <div className='font-medium pl-9 text-lg'>
      Price per night
    </div>
    <div className="flex justify-center mt-4">
      <div className="w-full md:w-80">
        <div className="flex justify-between mb-2">
          <label className="text-lg">₹  2000</label>
          <label className="text-lg">{maxPrice}</label>
          <label className="text-lg">₹  5000</label>
        </div>
        <input
          type="range"
          className="w-full bg-gray-300 rounded-lg appearance-none cursor-pointer"
          min="2000"
          max="5000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </div>

    {/* Guest rating */}
    <div className='font-medium pl-9 text-lg'>
      Guest rating
    </div>
    <div className="flex justify-center mt-2">
      <div className="w-full md:w-80 text-lg">
        <label className="flex items-center mb-2">
          <input type="radio" name="rating" value="any" className="mr-2 form-radio" />
          Any
        </label>
        <label className="flex items-center mb-2">
          <input type="radio" name="rating" value="9" className="mr-2 form-radio" />
          Wonderful  9+
        </label>
        <label className="flex items-center mb-2">
          <input type="radio" name="rating" value="8" className="mr-2 form-radio" />
          Very good  8+
        </label>
        <label className="flex items-center mb-2">
          <input type="radio" name="rating" value="7" className="mr-2 form-radio" />
          Good  7+
        </label>
      </div>
    </div>
  </div>

  <div className="w-full md:w-8/12 flex-col mt-4 pr-14">
    {/* Filtered hotels */}
    {filteredHotels.map((hotelItem, index) => (
      <Link to={`/hotelViewPage/${hotelItem.hotelId}`} key={index} style={{ textDecoration: 'none' }}>
        {index ===  0 && <div className='pl-2 text-white bg-blue-800 rounded-tl-2xl'>You were interested in this property.</div>}
        <div className={`flex w-full h-52 relative border border-black-200 mb-2 ${index ===  0 ? 'bg-blue-100 rounded-br-2xl rounded-bl-2xl' : 'bg-white rounded-2xl'}`}>
          <img src={hotelItem.images} alt={`Hotel ${hotelItem.id}`} className={`h-52 w-52 ${index ===  0 ? ' rounded-bl-2xl' : 'rounded-bl-2xl rounded-tl-2xl'}`} />
          <div className="flex flex-col justify-center ml-2 w-full">
            <div><h5 className='text-black font-serif'>{hotelItem.hotelName}</h5></div>
            <div className='text-black'>{hotelItem.location}</div>
            <div className='text-black'>{hotelItem.address}</div>
            <div className='flex justify-end text-black'>₹{hotelItem.price}</div>
          </div>
        </div>
      </Link>
    ))}

    {/* Pagination */}
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index +  1)}
          className={`mx-1 px-3 py-1 rounded ${currentPage === index +  1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {index +  1}
        </button>
      ))}
    </div>
  </div>
</section>
<Footer/>
    </div>
  )
}

export default UserHotelList
