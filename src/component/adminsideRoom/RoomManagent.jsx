import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import room from '../../images/room.png'
import axios from 'axios'
import AddRoomModal from './AddRoomModal'
import EditRoomModal from './EditRoomModal'
function RoomManagement() {
  const[rooms,setRooms]=useState([])// this is for store hotel details.
  const[addRoomModalOpen,setAddRoomModalOpen]=useState(false); //this is for add hotel modal data
  const [searchQuery, setSearchQuery] = useState('');// this is mainly used to serach the hotel
  const [showSidebar, setShowSidebar] = useState(true); //this is mainly used for show thr side bar 
  const[editRoomModalOpen,setRoomModalOpen]=useState(false);
  const[roomToEdit,setRoomToEdit]=useState(null);
  useEffect(() => {
    fetchAllRooms();
  }, [searchQuery]);

  const fetchAllRooms = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/admin/roomList', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          search: searchQuery,
        },
      });

      if (response.status >= 200 && response.status < 300) {
        setRooms(response.data);
      } else {
        console.error('Failed to fetch rooms:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error.message);
    }
  };
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };


  const open=()=>{
    setAddRoomModalOpen(true);
 
  }
 const close=()=>{
  setAddRoomModalOpen(false);
 }


    
const openEditRoomModal=async (roomId)=>{
  const token =localStorage.getItem('token');
  try {

    const response = await axios.get(`http://localhost:8080/api/admin/room/${roomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status >= 200 && response.status < 300) {
      setRoomToEdit(response.data);
    
      setRoomModalOpen(true);
    } else {
      console.error('Failed to fetch hotel details:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching hotel details:', error.message);
  }
};
const closeEditRoomModal = () => {
  setRoomToEdit(null);
  setRoomModalOpen(false);
  fetchAllRooms();

};
  
  return (
    <div>
      
      <div className={`flex h-screen ${showSidebar ? '' : 'overflow-x-hidden'}`}>
    {showSidebar && (
      <div className="w-1/4 p-6 bg-gray-800 text-white h-full">
        <div className="relative flex-col justify-start items-start">
          <div className="justify-center items-start gap-4 inline-flex">
            <div className="w-12 h-12 relative flex-col justify-start items-start flex">
              <img className="w-12 h-12 rounded-full" src={room} alt="User Logo" />
            </div>
            <div className="flex-col justify-start items-start">
              <div className="text-white text-lg font-bold leading-tight">Ashraf</div>
              <div className="text-gray-400 text-base font-normal leading-normal">Admin</div>
            </div>
          </div>
  
          <div className="flex-col justify-center items-start mt-4">
            <div className="pl-[23px] pr-[77.04px] py-[7px] bg-gray-700 rounded-tr-[30px] rounded-br-[30px] border-l-2 border-green-500 flex items-center gap-2">
              <div className="w-12 h-12 pl-[11px] pr-[10.69px] py-3 bg-gray-800 rounded-[40px]">
                <img src={room} alt="User Logo" />
              </div>
              <div className="text-green-500 text-lg font-medium leading-normal">Room Management</div>
            </div>
          </div>
        </div>
      </div>
    )}
    
  
    <div className={`text-gray-900 w-${showSidebar ? '3/4' : 'full'} h-full overflow-y-auto transition-all duration-300 ease-in-out`}>
      <div className="p-4 flex">
        <button onClick={toggleSidebar} className="text-blue-500 hover:text-blue-700 focus:outline-none">
        <div class="w-full h-40 flex items-center justify-center cursor-pointer">
       <div
          class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group"
       >
    <span
      class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"
    ></span>
    <span
      class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        class="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        class="w-5 h-5 text-green-400"
      >
        <path
          d="M14 5l7 7m0 0l-7 7m7-7H3"
          stroke-width="2"
          stroke-linejoin="round"
          stroke-linecap="round"
        ></path>
      </svg>
    </span>
    <span
      class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200"
      ></span>
  </div>
</div>
        </button>
        <h1 className="text-3xl font-semibold ml-4">Hotel List</h1>
      </div>
      <div className='flex content-center'>
                  <input
                  type="text"
                  placeholder="Search by Room number"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ml-4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <button className='ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={open}>
                    Add Room

                  </button>
                  
      </div>


      
      <div className="px-3 py-4 flex justify-center">
      <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <thead>
          <tr className="border-b bg-gray-200">
            <th className="text-left p-3 px-5">Room Number</th>
            <th className="text-left p-3 px-5">Room price</th>
            <th className="text-left p-3 px-5">Room Type</th>
            <th className="text-right p-3 px-5">images </th>
            <th className="text-right p-3 px-5"> Actions</th>
          </tr>
        </thead>
        <tbody>
         
        {rooms.map(room => (
      <tr key={room.roomId} className="border-b hover:bg-orange-100 bg-gray-100">
        <td className="p-3 px-5">{room.roomNumber}</td>
        <td className="p-3 px-5">{room.pricePerNight}</td>
        <td className="p-3 px-5">{room.roomType}</td>
        <td className="p-3 px-5">
          <img src={room.images} alt="Hotel" className="w-12 h-10" />
        </td>
        <td className="p-3 px-5 flex justify-end space-x-2">
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => openEditRoomModal(room.roomId)}>Edit</button>
        </td>
      </tr>
    ))}
        </tbody>
      </table>
    </div>

    </div>
  </div>
  <AddRoomModal isOpen={addRoomModalOpen} onSuccess={() => setAddRoomModalOpen(false)} />
  {editRoomModalOpen && <EditRoomModal isOpen={editRoomModalOpen} roomData={roomToEdit} onClose={closeEditRoomModal}/>}

      
    </div>
  )
}

export default RoomManagement;
