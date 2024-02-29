import React from 'react'
import california from '../../images/california.png';
import munnar from '../../images/munnar.png';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mumbai from '../../images/mumbai.png';
import delhi from '../../images/delhi.png';
function SliderInPlace() {
    const settings = {
       
        infinite: true,
        speed:  500,
        slidesToShow:  4,
      
        autoplay:true,
        autoplaySpeed:  2000, // Set the speed of autoplay in milliseconds
        cssEase: 'linear', // Use 'linear' easing for a smooth scrolling effect
        rtl: true,
        responsive: [
          {
            breakpoint:  768,
            settings: {
              slidesToShow:  1,
              slidesToScroll:  1,
            },
          },
          {
            breakpoint:  1024,
            settings: {
              slidesToShow:  3,
              slidesToScroll:  3,
            },
          },
          {
            breakpoint:  1200,
            settings: {
              slidesToShow:  4,
              slidesToScroll:  4,
            },
          },
        ],
      };
  return (
    <div>
      <section className='px-4'>
            <div class="text-slate-800 text-3xl font-medium font-['Roboto'] leading-loose md:ml-5 ">
                Explore stays in trending destinations
            </div>
            <Slider {...settings}>
          <div className="w-full h-64 relative rounded-2xl border border-zinc-200">
            <img src={california} alt="California" className="w-full h-48 object-cover rounded-t-2xl border border-solid border-gray-500"/>
            <h5 className="pl-2">Madgoan</h5>
            <h6 className="pl-2 font-thin">GOA</h6>
          </div>
          <div className="w-full h-64 relative rounded-2xl border border-zinc-200">
            <img src={munnar} alt="Munnar" className="w-full h-48 object-cover rounded-t-2xl border border-solid border-gray-500"/>
            <h5 className="pl-2">Kochi</h5>
            <h6 className="pl-2 font-thin">Kerala</h6>
          </div>
          <div className="w-full h-64 relative rounded-2xl border border-zinc-200">
            <img src={mumbai} alt="Mumbai" className="w-full h-48 object-cover rounded-t-2xl border border-solid border-gray-500"/>
            <h5 className="pl-2">Mumbai</h5>
            <h6 className="pl-2 font-thin">Maharashtra</h6>
          </div>
          <div className="w-full h-64 relative rounded-2xl border border-zinc-200">
            <img src={delhi} alt="Delhi" className="w-full h-48 object-cover rounded-t-2xl border border-solid border-gray-500"/>
            <h5 className="pl-2">Delhi</h5>
            <h6 className="pl-2 font-thin">New Delhi</h6>
          </div>
        </Slider>
    </section>
    </div>
  )
}

export default SliderInPlace
