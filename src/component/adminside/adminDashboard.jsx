import React, { useState,useEffect } from 'react'
import userlogo from '../../images/user.png'
import hotellogin from '../../images/hotellogin.png'
import room from '../../images/room.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
function AdminDashboard() {
  const[totalHotels,setTotalHotels]=useState(0);
  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assuming the user ID is stored under 'userId'
    const token = localStorage.getItem('token'); // Assuming the token is stored under 'token'

    if (userId && token) {
      axios.get(`https://www.emoh.tech/api/admin/countHotel/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setTotalHotels(response.data);
      })
      .catch(error => {
        console.error('Error fetching hotels:', error);
      });
    }
  }, []);
  return (
  
    <div className="text-gray-800">
    <div className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform">
        <div className="text-black font-bold mt-6 ml-2">ADMIN DASHBOARD</div>
        <div className='mt-8'>
          <div className='mt-2'>
            <Link to='/userList'>
                <div className=" justify-center items-center inline-flex bg-black text-white rounded-xl">
                    <div className=" py-2 pl-2 rounded-tr-lg rounded-br-lg justify-end items-center gap-2 inline-flex">
                        <div className="w-10 h-10 pl-3 pr-3 pt-3 pb-3 bg-white rounded-lg justify-center items-center inline-flex">
                            <img src={userlogo} alt=''/>
                        </div>
                        <div className="w-40 h-6 text-base font-medium font-['Heebo'] leading-normal">User management</div>
                    </div>
                </div>
            </Link>
            </div>
            <div className='mt-3'>
            <Link to='/hotellist'>
                <div className="justify-center items-center inline-flex bg-black rounded-xl text-white ">
                    <div className=" py-2 pl-2 rounded-tr-lg rounded-br-lg justify-end items-center gap-2 inline-flex">
                        <div className="w-10 h-10 pl-3 pr-3 pt-3 pb-3 bg-white rounded-lg justify-center items-center inline-flex">
                            <img src={hotellogin} alt=''></img>
                        </div>
                        <div className="w-40 h-6 text-base font-medium font-['Heebo'] leading-normal">Hotel management</div>
                    </div>
                </div>
            </Link>
            </div>
            <div className='mt-3'>
            <Link to='/roomManagement'>
                <div className="justify-center items-center inline-flex bg-black rounded-xl text-white">
                    <div className="py-2 pl-2 rounded-tr-lg rounded-br-lg justify-end items-center gap-2 inline-flex">
                        <div className="w-10 h-10 pl-3 pr-3 pt-3 pb-3 bg-white rounded-lg justify-center items-center inline-flex">
                            <img src={room} alt=''></img>
                        </div>
                        <div className="w-40 h-6 text-base font-medium font-['Heebo'] leading-normal">Room management</div>
                    </div>
                </div>
            </Link>
            </div>
        </div>
    </div>
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-40 md:hidden sidebar-overlay"></div>

    <div className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
            <ul className="ml-auto flex items-center">
                <li className="dropdown">
                    <div className="dropdown-menu shadow-md shadow-black/5 z-30 hidden max-w-xs w-full bg-white rounded-md border border-gray-100">
                        <div className="flex items-center px-4 pt-4 border-b border-b-gray-100 notification-tab">
                            <button type="button" data-tab="notification" data-tab-page="notifications" className="text-gray-400 font-medium text-sm hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1 active">Notifications</button>
                            <button type="button" data-tab="notification" data-tab-page="messages" className="text-gray-400 font-medium text-sm hover:text-gray-600 border-b-2 border-b-transparent mr-4 pb-1">Messages</button>
                        </div>
                    </div>
                </li>
                <li className="dropdown ml-3">
                    <button type="button" className="dropdown-toggle flex items-center">
                        <div className="flex-shrink-0 w-10 h-10 relative">
                            <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                                <img className="w-8 h-8 rounded-full" src="https://laravelui.spruko.com/tailwind/ynex/build/assets/images/faces/9.jpg" alt=""/>
                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                                <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="p-2 md:block text-left">
                            <h2 className="text-sm font-semibold text-gray-800">John Doe</h2>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>                
                    </button>
                </li>
            </ul>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 hover:shadow-2xl text-xl font-bold">
                    <div>
                      No Of Rooms
                    </div>
                    3
                </div>
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 hover:shadow-2xl  text-xl font-bold">
                   <div>No of hotels</div> 
                    {totalHotels}
                </div>
                <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5 hover:shadow-2xl  text-xl font-bold">
                    <div>No of bookings</div>
                    2
                    
                </div>
            </div>
        </div>
    </div>
</div>



    
  
  )
}

export default AdminDashboard;
