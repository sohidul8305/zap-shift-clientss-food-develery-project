import React from "react";

import ServiceImg from "../../assets/banner/service.png";

const Ourservice = () => {
  const servicesData = [
    {
      title: "Express & Standard Delivery",
      description:
        "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
      isHighlighted: false, 
    },
    {
      title: "Nationwide Delivery",
      description:
        "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
      isHighlighted: true, 
    },
    {
      title: "Fulfillment Solution",
      description:
        "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
      isHighlighted: false,
    },
    {
      title: "Cash on Home Delivery",
      description:
        "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
      isHighlighted: false,
    },
    {
      title: "Corporate Service / Contract In Logistics",
      description:
        "Customized corporate services which includes warehouse and inventory management support.",
      isHighlighted: false,
    },
    {
      title: "Parcel Return",
      description:
        "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
      isHighlighted: false,
    },
  ];

  return (
    <div className="bg-[#03373D] py-16 px-4 md:px-8 lg:px-16 min-h-screen flex flex-col items-center justify-center">

      <div className="text-center mb-12 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Our Services
        </h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`
              rounded-2xl p-7 flex flex-col items-start text-left 
              ${service.isHighlighted ? "bg-[#9FE85A] text-gray-900" : "bg-[#1E4D53] text-white"} 
              shadow-lg transition-transform transform hover:scale-[1.02]
            `}
          >
         
            <div
              className={`
                w-16 h-16 flex items-center justify-center rounded-full mb-5
                ${service.isHighlighted ? "bg-white/70" : "bg-[#2A5C63]"}
              `}
            >
              <img src={ServiceImg} alt={service.title} className="w-9 h-9" />
       

            </div>

       
            <h3
              className={`
                text-xl font-semibold mb-3 
                ${service.isHighlighted ? "text-gray-900" : "text-white"}
              `}
            >
              {service.title}
            </h3>

      
            <p
              className={`
                text-sm leading-relaxed 
                ${service.isHighlighted ? "text-gray-700" : "text-gray-300"}
              `}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourservice;