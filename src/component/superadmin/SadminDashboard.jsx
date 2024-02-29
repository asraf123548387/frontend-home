import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import userlogo from '../../images/user.png'
import AddAdminModal from './AddAdminModal';
function SadminDashboard() {
    const[admins,setAdmin]=useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
    const [blockedUsers, setBlockedUsers] = useState({});
    const blockUrl = 'http://localhost:8080/api/admin/block';
    const unblockUrl = 'http://localhost:8080/api/admin/unblock';
  
    const handleButtonClick = async (userId) => {
      const confirmed = window.confirm(`Are you sure you want to ${blockedUsers[userId] ? 'unblock' : 'block'} this user?`);
  
      if (confirmed) {
        try {
          const url = blockedUsers[userId] ? unblockUrl : blockUrl;
          const response = await axios.post(url, { userId }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (response.status >= 200 && response.status < 300) {
            setBlockedUsers(prevBlockedUsers => ({
              ...prevBlockedUsers,
              [userId]: !prevBlockedUsers[userId], // Invert blocked status
            }));
          } else {
            console.error('Failed to block/unblock user:', response.statusText);
          }
        } catch (error) {
          console.error('Error blocking/unblocking user:', error.message);
        }
      }
    };
    const openAddAdminModal = () => {
        setIsAddAdminModalOpen(true);
      };
      const closeAddAdminModal = () => {
        
        setIsAddAdminModalOpen(false);
      };
     
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        const fetchAllAdmins = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/SAdmin/getAllAdmin', {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              }, params: {
                search: searchQuery,
              },
              
            });
    
            if (response.status >= 200 && response.status < 300) {
              setAdmin(response.data);
            } else {
              console.error('Failed to fetch users:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching users:', error.message);
          }
        };
    
        fetchAllAdmins();
      }, [ searchQuery,isAddAdminModalOpen]);
  return (
    <div>
      



<div className="text-gray-800">
    <div className="fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 sidebar-menu transition-transform">
        <div className="text-black font-bold mt-6 ml-2">ADMIN DASHBOARD</div>
        <div className='mt-8'>
          <div className='mt-2'>
            <div >
                <div className=" justify-center items-center inline-flex bg-black text-white rounded-xl">
                    <div className=" py-2 pl-2 rounded-tr-lg rounded-br-lg justify-end items-center gap-2 inline-flex">
                        <div className="w-10 h-10 pl-3 pr-3 pt-3 pb-3 bg-white rounded-lg justify-center items-center inline-flex">
                            <img src={userlogo} alt=''/>
                        </div>
                        <div className="w-40 h-6 text-base font-medium font-['Heebo'] leading-normal">User management</div>
                    </div>
                </div>
            </div>
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
                      
                        <div className="">
                              <input
                              type="text"
                                placeholder="Search by Admin name"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                              className="ml-4 p-2 border border-gray-800 rounded"
                              />
                            <button
                                    className="mx-4 bg-black text-white font-bold py-2 px-4 rounded"
                                    onClick={openAddAdminModal}
                                  >
                                    Add Admin
                              </button>
                           <AddAdminModal isOpen={isAddAdminModalOpen} onRequestClose={closeAddAdminModal}  onSuccess={closeAddAdminModal}  />
                          </div>
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
        <div className="text-gray-900 w-3/4 h-full overflow-y-auto">
   
  
   
  </div>
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
        <tbody>
          <tr className="border-b">
            <th className="text-left p-3 px-5">Admin Name</th>
            <th className="text-left p-3 px-5">Email</th>
            <th className="text-left p-3 px-5">phoneNumber</th>
            <th></th>
          </tr>

          
          {admins.map((admin) => (
                <tr key={admin.id} className="border-b hover:bg-orange-100 bg-gray-100">
                  <td className="p-3 px-5">{admin.userName}</td>
                  <td className="p-3 px-5">{admin.email}</td>
                  <td className="p-3 px-5">{admin.mobile}</td>
                  
                  <td className="p-3 px-5 flex justify-end">
                  <button
                    type="button"
                    
                    className={`mr-3 text-sm ${blockedUsers[admin.id] ? 'bg-green-500 hover:bg-green-700' : 'bg-black '} text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
                    onClick={() => handleButtonClick(admin.id)}
                  >
                    
                    {blockedUsers[admin.id] ? 'Unblock' : 'Block'}
                  </button>
                  </td>
                </tr>
              ))}
              
        </tbody>
      </table>
        </div>
    </div>
</div>
</div>
  )
}

export default SadminDashboard
