import React from "react";

import bookingIcon from '../../../assets/banner/bookingIcon.png'; 

const HowItwork = () => {
  
  const cardsData = [
    { title: "Booking Pick & Drop", icon: bookingIcon },
    { title: "Cash On Delivery", icon: bookingIcon },
    { title: "Delivery Hub", icon: bookingIcon },
    { title: "Booking SME & Corporate", icon: bookingIcon },
  ];


  const sectionBgColor = 'bg-gray-100'; 

  return (
    <div className={`py-16 ${sectionBgColor}`}>
     
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 ml-8 md:ml-20">
        How it Works
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
        {cardsData.map((card, index) => (

          <div 
            key={index} 
            className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-xs bg-white rounded-2xl shadow-md p-6 transition-transform transform hover:scale-[1.02]"
          >
            
            <div className="mb-4 pt-4 pb-6">
           
              <div className="w-12 h-12 flex items-center justify-center border-2 border-teal-600 rounded-full bg-teal-50/20">
                 
                  <img src={card.icon} alt={card.title} className="w-8 h-8 opacity-70" />
              
              </div>
            </div>

         
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {card.title}
            </h3>

            <p className="text-sm text-gray-600">
              From personal packages to business shipments — we deliver on time, every time.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItwork;