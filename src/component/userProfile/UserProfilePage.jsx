import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../userside/Navbar';
import { useAuth } from '../../contextapi/authContext';
import Swal from 'sweetalert2';


function UserProfilePage() {
  const { login } = useAuth();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');

  const [editPhone,setEditPhone]=useState(false);
  const [newPhone,setNewPhone]=useState('');

  const[editAddress,setEditAddress]=useState(false);
  const[newAddress,setNewAddress]=useState('');

  const[editDateOfBirth,setEditDateOfBirth]=useState(false);
  const[newDateOfBirth,setNewDateOfBirth]=useState('');

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://www.emoh.tech/api/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);


  //// the below code is handling the the userName

  const handleSaveClick = () => {
      // Handle saving the new name
      const userId=localStorage.getItem('userId');
      const token=localStorage.getItem('token');
      localStorage.setItem('userName',newName)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.put(`https://www.emoh.tech/api/user/profile/updateUser`,{userName:newName,id:userId})
      .then(response => {
        // Handle success response from the backend
        console.log('User name updated successfully');
        setIsEditing(false);
        login();

        fetchUserData();
    })
    .catch(error => {
        // Handle error response from the backend
        console.error('Error updating user name:', error);
    });
  };
  const handleEditClick = () => {
    setIsEditing(true);
};

//below code is handling the phone to edit 

const handleEditPhone = () => {
  setEditPhone(true);
};

const handleSavePhone = () => {
  // Handle saving the new name
  const userId=localStorage.getItem('userId');
  const token=localStorage.getItem('token');
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.put(`https://www.emoh.tech/api/user/profile/updatePhone`,{mobile:newPhone,id:userId})
  .then(response => {
    // Handle success response from the backend
    console.log('phone updated successfully');
    setEditPhone(false);
    login();

    fetchUserData();
})
.catch(error => {
    // Handle error response from the backend
    console.error('Error updating user name:', error);
});
};


// below code is handlig the new address

const handleEditAddress = () => {
  setEditAddress(true);
};
const handleSaveAddress = () => {
  // Handle saving the new name
  const userId=localStorage.getItem('userId');
  const token=localStorage.getItem('token');
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.put(`https://www.emoh.tech/api/user/profile/updateAddress`,{address:newAddress,id:userId})
  .then(response => {
    // Handle success response from the backend
    console.log('address successfully');
    setEditAddress(false);
    login();

    fetchUserData();
})
.catch(error => {
    // Handle error response from the backend
    console.error('Error updating user name:', error);
});
};


//below is the code for updating the address

const handleEditDateOfBirth = () => {
  setEditDateOfBirth(true);
};


   // Function to calculate age based on date of birth
   function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}


const handleSaveDateOfBirth = () => {

  const age=calculateAge(newDateOfBirth);
  if(age<18){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "You must be at least 18 to have a Home.com account!",
      
    });
    return;
  }
  // Handle saving the new name
  const userId=localStorage.getItem('userId');
  const token=localStorage.getItem('token');
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  axios.put(`https://www.emoh.tech/api/user/profile/updateDateOfBirth`,{dateOfBirth:newDateOfBirth,id:userId})
  .then(response => {
    // Handle success response from the backend
    console.log('address successfully');
    setEditDateOfBirth(false);
    login();

    fetchUserData();
})
.catch(error => {
    // Handle error response from the backend
    console.error('Error updating user name:', error);
});
};




  
  return (
  <div>
    <Navbar/>
    <div className='flex '>
        <div className='w-1/12'>

        </div>
        <div className='w-10/12 font-sans'>
          <h1 className="mb-4">Personal Details</h1>
          <p className="mb-4">Update your info and find out how it's used.</p>
          <hr className="mb-4" />

          <div className='flex justify-between items-center mb-3'>
                <div className='w-4/12'>
                    <p className="flex-1">Name:</p>
                </div>
                <div className='w-6/12'>
                    {isEditing ? (
                        <input
                            type="text"
                            className="border-b border-gray-400"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                        />
                    ) : (
                        <p className="flex-1">{user.userName}</p>
                    )}
                </div>
                <div className='w-2/12 text-right'>
                    {isEditing ? (
                        <button onClick={handleSaveClick} className='text-blue-700'>Save</button>
                    ) : (
                        <button onClick={handleEditClick} className='text-blue-700'>Edit</button>
                    )}
                </div>
            </div>



          <hr className="mb-4" />

          <div className='flex justify-between items-center mb-3'>
            <div className='w-4/12'>
              <p className="flex-1">Email Address:</p>
             </div>
             <div className='w-6/12'>
              <p className="flex-1">{user.email}<button className='bg-green-700 text-white ml-3 rounded-lg w-16'>verified</button></p>
              <p>This is the email address you use to sign in. It’s also where we send your booking confirmations.</p>
              </div>
              <div className='w-2/12 text-right '>
              <button className='text-blue-700 w-auto hover:bg-slate-500'></button>
              </div>
          </div>
          <hr className="mb-4" />

           <div className='flex justify-between items-center mb-3'>
                <div className='w-4/12'>
                    <p className="flex-1">Phone Number:</p>
                </div>
                <div className='w-6/12'>
                    {editPhone ? (
                        <input
                            type="text"
                            className="border-b border-gray-400"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                    ) : (
                        <p className="flex-1">{user.mobile}</p>
                    )}
                </div>
                <div className='w-2/12 text-right'>
                    {editPhone ? (
                        <button onClick={handleSavePhone} className='text-blue-700'>Save</button>
                    ) : (
                        <button onClick={handleEditPhone} className='text-blue-700'>Edit</button>
                    )}
                </div>
            </div>

          <hr className="mb-4" />
          <div className='flex justify-between items-center mb-3'>
                <div className='w-4/12'>
                    <p className="flex-1">Date Of birth:</p>
                </div>
                <div className='w-6/12'>
                    {editDateOfBirth ? (
                        <input
                            type="date"
                            className="border-b border-gray-400"
                            value={newDateOfBirth}
                            onChange={(e) => setNewDateOfBirth(e.target.value)}
                        />
                    ) : (
                        <p className="flex-1">{user.dateOfBirth}</p>
                    )}
                </div>
                <div className='w-2/12 text-right'>
                    {editDateOfBirth ? (
                        <button onClick={handleSaveDateOfBirth} className='text-blue-700'>Save</button>
                    ) : (
                        <button onClick={handleEditDateOfBirth} className='text-blue-700'>Edit</button>
                    )}
                </div>
            </div>
          <hr className="mb-4" />
          <div className='flex justify-between items-center mb-3'>
                <div className='w-4/12'>
                    <p className="flex-1">Address:</p>
                </div>
                <div className='w-6/12'>
                    {editAddress ? (
                       <textarea
                       className="border-b border-gray-400"
                       value={newAddress}
                       onChange={(e) => setNewAddress(e.target.value)}
                   />
                    ) : (
                        <p className="flex-1">{user.address}</p>
                    )}
                </div>
                <div className='w-2/12 text-right'>
                    {editAddress ? (
                        <button onClick={handleSaveAddress} className='text-blue-700'>Save</button>
                    ) : (
                        <button onClick={handleEditAddress} className='text-blue-700'>Edit</button>
                    )}
                </div>
            </div>
          <hr className="mb-4" />
      </div>

    </div>

   
 </div>
  )
}

export default UserProfilePage
