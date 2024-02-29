import React,{useState} from 'react'

import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'; 
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
function SearchDate() {
//below code is for selecting date picking
  const navigate=useNavigate();

    const [datePickerOpen, setDatePickerOpen] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    });
  
    const handleSelect = (ranges) => {
      setSelectionRange(ranges.selection);
    };
      // State for managing the selected destination
  const [selectedDestination, setSelectedDestination] = useState(null);
  const handleDestinationChange = (selectedOption) => {
    setSelectedDestination(selectedOption.value);
  };
    const handleSearch = () => {
      // Assuming you want to navigate to UserSearchHotelList with some state
      navigate('/userSearchHotelList', {
        state: {
          
          destination: selectedDestination, // Assuming you have a state for selectedDestination
          
        },
      });
    };






    //below code is for applying or selecting the destination
    const options = [
        { value: 'Goa', label: 'Goa' },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Kochi', label: 'Kochi' },
        { value: 'Delhi', label: 'Delhi' }
      ];
     
 // below code for aplpying the modal to get modal
    const[adults,setAdults]=useState(1);
    const[children,setChildren]=useState(0);
    const[modalIsOpen,setModalIsOpen]=useState(false);
     const handleAdultIncrement =()=>{
        setAdults(adults+1);
     }
     const handleAdultDecrement=()=>{
        setAdults(adults-1);
     }
     const handleChildIncrement = () => {
        setChildren(children + 1);
      };
    
      const handleChildDecrement = () => {
        if (children > 0) {
          setChildren(children - 1);
        }
      };
  return (
 
               <section className='flex flex-col md:flex-row  mt-20 md:mt-2'>
                      <div className='w-full md:w-12'></div>

                      <div className='w-full md:w-11/12'>
                      <div className="h-16 p-1 md:bg-yellow-500 rounded-lg shadow flex flex-col md:flex-row justify-center items-start gap-1 ">
                      <div className="flex-grow flex-shrink flex-basis-0 self-stretch py-1 bg-white rounded justify-center items-center w-full md:w-4/12 h-14 relative">
                     
                      <Dropdown
                            options={options}
                            placeholder="Going to"
                            menuPlacement="bottom"
                            className="text-lg font-sans font-semibold"
                            onChange={handleDestinationChange}
                          />

                           </div>

                             <div onClick={() => setDatePickerOpen(!datePickerOpen)}    className="flex-grow flex-shrink flex-basis-0 self-stretch px-2 py-2 bg-white rounded justify-center items-center w-full md:w-4/12 h-14 border border-gray-300">
                                            <FontAwesomeIcon icon={faCalendarDays}  />
                                            <input
                                                className='h-10  text-lg pl-3 outline-none' // Adjust height and width as needed
                                                style={{ width: '26vw', fontSize: '1.5vw' }} // Additional inline styles
                                                value={`${selectionRange.startDate.toDateString()} - ${selectionRange.endDate.toDateString()}`}
                                                readOnly
                                            />
                                                {datePickerOpen && (
                                                <div style={{ position: 'absolute', zIndex: 1 }}>
                                                <DateRangePicker
                                                    ranges={[selectionRange]}
                                                    onChange={handleSelect}
                                                />
                                            </div>
                                    )}
                             </div>

                           
                                        <input
                                            className="flex-grow flex-shrink flex-basis-0 self-stretch px-2 py-2 outline-none bg-white rounded justify-center items-center w-full md:w-3/12 h-14 border border-gray-300"
                                            onClick={() => setModalIsOpen(true)}
                                            value={`Travellers: ${adults}, Children: ${children}`}
                                            readOnly
                                            
                                        />
                                        <Modal isOpen={modalIsOpen}
                                         onRequestClose={() => setModalIsOpen(false)}
                                         
                                         style={{
                                            overlay: {
                                                background:'transparent'
                                                },
                                            content: {
                                            
                                             
                                              marginLeft: '60vw',
                                              marginTop:'30vh'

                                            },
                                          }}
                                          className='w-96 h-60 '
                                        >
                                         
                                         
                                         
                                         <div className="p-6 bg-white rounded-md">
                                                <h2 className="text-xl font-bold mb-4">ROOM 1</h2>
                                                <div className=" mb-4">
                                                        <div className="flex ">
                                                            <button className="text-lg font-semibold bg-gray-200 rounded-lg px-3 py-1 mr-2" onClick={handleAdultDecrement}>-</button>
                                                            <span className=" flex justify-center text-lg font-semibold w-36">Adults: {adults}</span>
                                                            <button className="text-lg font-semibold bg-gray-200 rounded-lg px-3 py-1 ml-2" onClick={handleAdultIncrement}>+</button>
                                                        </div>
                                                        <div className="flex mt-3">
                                                            <button className="text-lg font-semibold bg-gray-200 rounded-lg px-3 py-1 mr-2" onClick={handleChildDecrement}>-</button>
                                                            <span className=" flex justify-center text-lg font-semibold w-36">Children: {children}</span>
                                                            <button className="text-lg font-semibold bg-gray-200 rounded-lg px-3 py-1 ml-2" onClick={handleChildIncrement}>+</button>
                                                        </div>
                                                </div>
                                                <button className="bg-blue-500 text-white font-semibold rounded-lg px-4 py-2" onClick={() => setModalIsOpen(false)}>Close</button>
                                            </div>
                                        </Modal>
                                    
                              <button onClick={handleSearch} className="pt-3 px-2 pb-3 bg-blue-700 text-white rounded no-underline md:mt-0 w-full md:w-1/12">
                                  Search
                              </button>
                          </div>
                      </div>
                  </section>
    
  )
}

export default SearchDate
