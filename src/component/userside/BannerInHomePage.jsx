import React from 'react'

function BannerInHomePage() {
  return (
    <div>
      <section className='mt-4  hidden md:flex'>
<div className='w-full md:w-12'></div>
    <div className="md:w-11/12  h-auto py-3 bg-rose-600 rounded-2xl flex flex-col md:flex-row justify-center items-center gap-4 md:gap-10  ">
        <div className="w-full md:w-3/12 md:max-w-52 h-auto md:h-38 flex flex-col justify-between md:mr-4">
            <p className="text-white text-xl font-medium font-['Roboto'] leading-loose text-center md:text-left">Find and book your<br />perfect stay</p> 
        </div>

        <div className="md:w-full md:max-w-3xl h-auto md:h-32 justify-center items-start gap-3 md:inline-flex">
            <div className="w-full md:w-4/12 md:max-w-72 h-auto md:h-32 px-5 py-9 bg-rose-800 rounded-2xl justify-center items-center gap-4">
                <p className="h-auto text-white text-base font-normal font-['Roboto'] leading-tight text-center md:text-left">Earn rewards on every<br/>night you stay</p>
            </div>

            <div className="w-full md:w-4/12 md:max-w-72 h-auto md:h-32 px-5 py-9 bg-rose-800 rounded-2xl justify-center items-center gap-4">
                <p className="w-full h-auto text-white text-base font-normal font-['Roboto'] leading-tight text-center md:text-left">Save more with<br/>Member Prices</p>
            </div>
            <div className="w-full md:w-4/12 md:max-w-72 h-auto md:h-32 px-5 py-9 bg-rose-800 rounded-2xl justify-center items-center gap-4">
                <p className="w-full h-auto text-white text-base font-normal font-['Roboto'] leading-tight text-center md:text-left">Free cancellation<br/>options if plans change</p>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}

export default BannerInHomePage
