import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SliderInDifferentCategory() {
    const settings1 = {
        infinite: true,
        speed: 500,
        slidesToShow: 12, // Adjust the number of slides to show
        slidesToScroll: 1,
        autoplay: true,        // Enable automatic sliding
        autoplaySpeed: 3000,
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
              slidesToShow: 4, // Update to 1 slide for small devices
              slidesToScroll: 4,
            },
          },
        ],
      };
  return (
    <div>
      
{/* in this section add 12 different types */}
<section className='mt-28 md:mt-6'>
<div className='flex'>


  <div className='w-12'>

  </div>
 
  <Slider {...settings1} className='w-11/12 flex'>
      <div className='w-1/12 flex items-center justify-center'>
        <div className=" text-blue-500 hover:text-black transition duration-300 ease-in-out">
          <div className="w-12 h-6 ">
            <svg className="uitk-icon uitk-icon uitk-icon-leading "
              aria-hidden="true" viewBox="0 0 24 24">
              <path d="M16.5 2.05a3.9 3.9 0 0 0-4.5 1.5 3.9 3.9 0 0 0-4.5-1.5l2.48 2.47A4.46 4.46 0 0 0 5.5 7h4.05a3.9 3.9 0 0 0-1.5 4.5l3.14-3.15-.5 5.65H7a4 4 0 0 0-4 4h1c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h1a4 4 0 0 0-4-4h-3.68l-.52-5.65 3.15 3.15a3.9 3.9 0 0 0-1.5-4.5h4.05a4.46 4.46 0 0 0-4.48-2.48l2.48-2.47zM16 18.68A7.03 7.03 0 0 0 20 20h1v2h-1a8.7 8.7 0 0 1-4-.99 8.75 8.75 0 0 1-8 0A8.83 8.83 0 0 1 4 22H3v-2h1c1.39 0 2.78-.47 4-1.32a6.88 6.88 0 0 0 8 0z"></path>
            </svg>
          </div>
          <div className="mt-6">
            Resort
          </div>
        </div>
      </div>


        <div className='w-1/12 flex items-center justify-center'>
            <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
              <div className=' w-12 h-6'>
                <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24" >
                <path d="M6 19h12v-2H6v2Zm0-4h12v-2H6v2Zm0-4h12v-.9L16.55 9h-9.1L6 10.1v.9Zm4.05-4h3.9L12 5.525 10.05 7ZM4 21v-9.375L2.2 13 1 11.4l3-2.3V6h2v1.575L12 3l11 8.4-1.2 1.575-1.8-1.35V21H4ZM4 5c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 7 2a.97.97 0 0 0 .713-.288A.968.968 0 0 0 8 1h2c0 .833-.292 1.542-.875 2.125A2.893 2.893 0 0 1 7 4a.968.968 0 0 0-.713.287A.968.968 0 0 0 6 5H4Z"></path></svg>
              </div>
              <div className=' mt-6'>
                Cottage
              </div>
            </div>
        </div>
        <div className='w-1/12 flex items-center justify-center'>
              <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
                <div className='w-12 h-6'>
                  <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24" >
                  <path fill-rule="evenodd" d="M18 4v17a1 1 0 0 1-1 1h-3v-2a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2H7a1 1 0 0 1-1-1V4a1 1 0 0 1 0-2h12a1 1 0 1 1 0 2zM8.5 14a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0-4a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0-4a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm5 8a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0-4a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0-4a.5.5 0 0 0-.5.5v1c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2z" clip-rule="evenodd"></path></svg>
                </div>
                <div className=' mt-6'>
                  Appart
                </div>
              </div>
        </div>
        <div className='w-1/12 flex items-center justify-center'>
            <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
              <div className='w-12 h-6'>
                <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24" >
                <path d="M10 10v2H8v-2h2Zm6 2v-2h-2v2h2Zm5 2v8H3v-8h1v-4a8 8 0 1 1 16 0v4h1ZM7 
                16H5v4h2v-4Zm4 0H9v4h2v-4Zm0-11.92A6 6 0 0 0 6 10v4h5V4.08ZM13 14h5v-4a6 6 0 0 0-5-5.92V14Zm2
                2h-2v4h2v-4Zm4 0h-2v4h2v-4Z"></path></svg>
              </div>
              <div className='flex  mt-6'>
                villa
                
              </div>
            </div>    
        </div>

        <div className='w-1/12 flex items-center justify-center'>
          <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
              <div className='w-12 h-6'>
              <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24" >
              <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L10.49 12 7.8 14.39a3.38 3.38 0 1 1 .04-4.74l1.13 
              1 1.51-1.34L9.22 8.2A5.4 5.4 0 0 0 0 12a5.4 5.4 0 0 0 9.17 3.85l2.83-2.5 
              4.2-3.74a3.38 3.38 0 1 1-.04 4.74l-1.14-1.01-1.51 1.34 1.27 1.12A5.4 5.4 0 0 0 24 
              11.99a5.38 5.38 0 0 0-5.4-5.37z"></path></svg>
            </div>
            <div className='flex ml-3 mt-6'>
              ALL
            </div>
        </div>
        </div>
        <div className='w-1/12 flex items-center justify-center'>
          <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
            <div className='w-12 h-6'>
              <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24" >
                <path fill-rule="evenodd" d="M20 21a7.06 7.06 0 0 1-3.74-1.14.5.5 0 0 0-.53 0 6.88 6.88 0 
                0 1-7.47 0 .5.5 0 0 0-.53 0A7 7 0 0 1 4 21H3a1 1 0 1 0 0 2h1c1.38 0 2.74-.35
                 4-.99a8.75 8.75 0 0 0 8 0 8.7 8.7 0 0 0 4 .99h1a1 1 0 1 0 0-2h-1zM3.95 19H4c1.42 0 
                 2.7-.7 3.66-1.64a.5.5 0 0 1 .69 0c.95 1 2.27 1.6 3.65 1.64 1.42 0 2.7-.7 3.66-1.64.2-.19.5-.19.69 0 
                 .95 1 2.27 1.6 3.65 1.64h.05l1.89-6.68a1 1 0 0 0-.66-1.28L20 10.62V6a2 2 0 0 0-2-2h-3V2a1 
                 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v2H6a2 2 0 0 0-2 2v4.62l-1.29.42a1 1 0 0
                  0-.66 1.28L3.95 19zM7 6h10a1 1 0 0 1 1 1v2.97L12.62 8.2c-.4-.13-.84-.13-1.25 0L6 9.97V7a1
                   1 0 0 1 1-1z" clip-rule="evenodd"></path></svg>
            </div>
            <div className='flex ml-3 mt-6'>
               Boat
            </div>
          </div>
        </div>
        <div className='w-1/12 flex items-center justify-center'>
          <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
             <div className='w-12 h-6'>
             <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M12.84 2.38c-.4-.5-1.16-.5-1.57 0a13.12 13.12 0 0 0-2.77 
              7.1c1.29.69 2.46 1.69 3.49 2.76a14.94 14.94 0 0 1 3.5-2.76 12.92 12.92 0 0 0-2.65-7.12zm-3.87
               9.89-.46-.29c.15.11.32.19.46.29zm3.02 3.17a12.03 12.03 0 0 0-8.87-5.39A1.02 1.02 0 0 0 2 11.16 
               12.19 12.19 0 0 0 12 22a12.18 12.18 0 0 0 10-10.84 1.02 1.02 0 0 0-1.12-1.11 12.03 12.03 0 0 0-8.89
                5.39z" clip-rule="evenodd"></path></svg>

            </div>
            <div className=' mt-6 ml-3 flex '>
              Spa
            </div>
          </div>

        </div>
        <div className='w-1/12 flex items-center justify-center'>
          <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
            <div className='w-12 h-6'>
             <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24"  >
               <path fill-rule="evenodd" d="M4.5 11.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1
                0 5zm4.5-4a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm6 0a2.5 2.5 0
                 1 1 0-5 2.5 2.5 0 0 1 0 5zm4.5 4a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 
                 0 5zm-2.15 2.86c1.3 1.31 2.92 2.76 2.6 4.8a3.15 3.15 0 0 1-2.32 
                 2.32c-.73.14-3.06-.44-5.54-.44h-.18c-2.48 0-4.81.59-5.54.44a3.14 
                 3.14 0 0 1-2.33-2.32c-.3-2.03 1.3-3.48 2.62-4.79l2.48-2.91a4.3 4.3 0
                  0 1 1.75-1.32c.1-.04.22-.07.33-.09.26-.05.53-.05.79-.05s.53 0 .78.04l.33.09c.7.24
                   1.29.78 1.75 1.32l2.48 2.91z" clip-rule="evenodd"></path></svg>
             </div>
             <div className=' mt-6'>
              Pet 
             </div>
           </div>     
             
        </div>
        <div className='w-1/12 flex justify-center items-center'>
          
          <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
            <div className='w-12 h-6'>
             <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M6.11 5.52A1.24 1.24 0 0 1 5 4.31v-.1c0-.7.6-1.27 1.3-1.2 1.74.14 2.92.68 4.18 1.95l6.42 6.42-.41.23c-.37.24-.6.37-1.15.37-.55 0-.78-.14-1.15-.36a3.82 3.82 0 0 0-2.18-.65c-1.11 0-1.73.37-2.19.64a1.8 1.8 0 0 1-1.15.37 1.8 1.8 0 0 1-1.15-.36 5.42 5.42 0 0 0-.77-.4L10 7.97l-1-1a4.53 4.53 0 0 0-2.89-1.45zm15.24 13.39c.38.13.65.45.65.86v.12a.97.97 0 0 1-1.3.9c-.37-.12-.65-.3-.88-.43-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.07.64-2.18.64a3.8 3.8 0 0 1-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.46.27-1.08.64-2.19.64a3.8 3.8 0 0 1-2.18-.64c-.37-.23-.6-.36-1.15-.36-.55 0-.78.13-1.15.35-.24.14-.52.3-.89.44a.97.97 0 0 1-1.3-.91v-.12c0-.4.27-.73.65-.86.17-.06.32-.15.5-.27.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.23.59.36 1.15.36.56 0 .78-.13 1.15-.36.46-.27 1.08-.64 2.19-.64 1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36.55 0 .78-.13 1.15-.36.45-.27 1.07-.64 2.18-.64s1.73.37 2.18.64c.18.12.33.21.5.27zM3.11 16.34A.88.88 0 0 1 2 15.48v-.23c0-.4.27-.73.65-.86.17-.07.32-.16.5-.27a3.82 3.82 0 0 1 2.18-.64c1.11 0 1.74.37 2.19.64.37.22.6.36 1.15.36.56 0 .78-.13 1.15-.36a3.82 3.82 0 0 1 2.18-.64c1.11 0 1.73.37 2.18.64.37.22.6.36 1.15.36.55 0 .78-.13 1.15-.36a3.82 3.82 0 0 1 2.19-.64c1.1 0 1.73.37 2.18.64.19.11.34.2.5.26.38.14.65.46.65.86v.13a.98.98 0 0 1-1.31.9 4.75 4.75 0 0 1-.85-.42c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.08.64-2.19.64a3.83 3.83 0 0 1-2.18-.64c-.37-.22-.6-.36-1.15-.36-.56 0-.78.13-1.15.36-.45.27-1.07.64-2.18.64a3.82 3.82 0 0 1-2.18-.64c-.38-.22-.6-.36-1.16-.36-.55 0-.78.13-1.15.36-.28.16-.62.36-1.09.49zM16.5 8a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" clip-rule="evenodd"></path></svg>
           </div>
           <div className=' mt-6'>
            Swim
           </div>
           </div>
        </div>
        <div className='w-1/12 flex items-center justify-center'>
          <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
            <div className='w-12 h-6'>
                  <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24"  >
                  <path fill-rule="evenodd" d="M18.65 5.86c-.6-.6-.9-1.44-.74-2.27L18 3h-1.89l-.06.43a4.27 4.27 0 0 0 1.37 3.78c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43a4.24 4.24 0 0 0-1.3-3.71zM9 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm2 6h11v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8h3v-.75A2.28 2.28 0 0 1 7.28 9c.6 0 1.24.28 1.65.73L11 12zm-4 8H5v-6h2v6zm2 0h2v-6H9v6zm6-6v6h-2v-6h2zm4 6v-6h-2v6h2zM14.65 5.86a4.24 4.24 0 0 1 1.3 3.71l-.06.43h-1.91l.11-.59c.15-.79-.1-1.58-.67-2.2a4.27 4.27 0 0 1-1.37-3.78l.06-.43H14l-.09.59c-.16.83.15 1.68.74 2.27z" clip-rule="evenodd"></path></svg>
            </div>
            <div className=' mt-6'>
              Hot tub
            </div>
          </div>
        </div>

        <div className='w-1/12 flex justify-center items-center'>
          <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
            <div className='w-12 h-6'>
                      <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M21.98 14H22h-.02ZM5.35 13c1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.4.98 3.31 1v-2c-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1v2c1.9 0 2.17-1 3.35-1Zm13.32 2c-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.1 1-3.34 1-1.24 0-1.38-1-3.33-1-1.95 0-2.1 1-3.34 1v2c1.95 0 2.11-1 3.34-1 1.24 0 1.38 1 3.33 1 1.95 0 2.1-1 3.34-1 1.19 0 1.42 1 3.33 1 1.94 0 2.09-1 3.33-1 1.19 0 1.42 1 3.33 1v-2c-1.24 0-1.38-1-3.33-1ZM5.35 9c1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.42 1 3.33 1 1.95 0 2.09-1 3.33-1 1.19 0 1.4.98 3.31 1V8c-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1-1.95 0-2.09 1-3.33 1-1.19 0-1.42-1-3.33-1C3.38 7 3.24 8 2 8v2c1.9 0 2.17-1 3.35-1Z"></path></svg>
            </div>
            <div className=' mt-6'>
              Sea view
            </div>
          </div>
        </div>
         <div className='w-1/12 flex justify-center items-center'>
           <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
                <div className='w-12 h-6'>
                    <svg className="uitk-icon uitk-icon uitk-icon-leading  " aria-hidden="true" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M14.06 9c.5 0 .93-.39.94-.89a4.34 4.34 0 0 0-1.35-3.25c-.65-.72-.8-1.27-.77-1.91a.93.93 0 0 0-.94-.95c-.5 0-.93.4-.94.9a4.34 4.34 0 0 0 1.35 3.25c.61.59.78 1.27.78 1.89-.01.52.4.96.93.96zm-4 0c.5 0 .93-.39.94-.89a4.34 4.34 0 0 0-1.35-3.25c-.65-.72-.8-1.27-.77-1.91A.93.93 0 0 0 7.94 2c-.5 0-.93.4-.94.9a4.34 4.34 0 0 0 1.35 3.25c.61.59.78 1.27.78 1.89-.01.52.4.96.93.96zM20 20a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16zm-.15-9a1 1 0 0 1 .99 1.14l-.6 4.14A2 2 0 0 1 18.28 18H9.73a2 2 0 0 1-1.98-1.72L7.3 13H4a1 1 0 1 1 0-2h15.85zm-3.91-9c.53 0 .96.43.94.95-.03.64.12 1.19.77 1.91A4.34 4.34 0 0 1 19 8.11a.93.93 0 0 1-.94.89.93.93 0 0 1-.93-.96c0-.62-.17-1.3-.78-1.89A4.34 4.34 0 0 1 15 2.9c.01-.5.44-.9.94-.9z" clip-rule="evenodd"></path></svg>
                </div>
                <div className='flex  mt-6'>
                  Apart 
                </div>
           </div>
        </div>
        <div className='w-1/12 flex items-center justify-center'>
          <div className=' text-blue-500 hover:text-black transition duration-300 ease-in-out'>
              <div className='w-12 h-6'>
              <svg class="uitk-icon uitk-icon uitk-icon-leading" aria-hidden="true" viewBox="0 0 24 24" >
              <path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L10.49 12 7.8 14.39a3.38 3.38 0 1 1 .04-4.74l1.13 
              1 1.51-1.34L9.22 8.2A5.4 5.4 0 0 0 0 12a5.4 5.4 0 0 0 9.17 3.85l2.83-2.5 
              4.2-3.74a3.38 3.38 0 1 1-.04 4.74l-1.14-1.01-1.51 1.34 1.27 1.12A5.4 5.4 0 0 0 24 
              11.99a5.38 5.38 0 0 0-5.4-5.37z"></path></svg>
            </div>
            <div className='flex  mt-6'>
              ALL
            </div>
        </div>
        </div>
  </Slider>


 </div>

  </section>

    </div>
  )
}

export default SliderInDifferentCategory
