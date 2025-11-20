import React from 'react';

import LiveTrackingImage from "../../assets/banner/live-tracking.png";
import SafeDeliveryImage from "../../assets/banner/safe-delivery.png";
import  SafeDeliveryImager from "../../assets/banner/safe-delivery.png";


const FeaturesSection = () => {
    
    const featuresData = [
        {
            title: "Live Parcel Tracking",
            description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
            imageAlt: "Illustration of Live Parcel Tracking",
            imageSrc: LiveTrackingImage, 
            imagePlacement: 'left' 
        },
        {
            title: "100% Safe Delivery",
            description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
            imageAlt: "Illustration of Safe Delivery",
            imageSrc: SafeDeliveryImage, 
            imagePlacement: 'right'
        },
        {
            title: "24/7 Call Center Support",
            description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
            imageAlt: "Illustration of Call Center Support",
            imageSrc: SafeDeliveryImager, 
            imagePlacement: 'left'
        },
    ];

    return (
     
        <div className="bg-gray-50 py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {featuresData.map((feature, index) => {
                    
                    const isImageOnLeft = feature.imagePlacement === 'left';
                    
                    return (
                        <div
                            key={index}
                            className={`
                                bg-white rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center transition-shadow hover:shadow-lg
                                ${isImageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse'}
                            `}
                        >
                           
                            <div className="w-full md:w-1/3 flex justify-center p-4 md:p-0 mb-4 md:mb-0">
                                <img
                                  
                                    className="w-full h-auto max-w-xs md:max-w-full object-contain"
                                    style={{ maxHeight: '180px' }}
                                />
                            </div>

                            {/* টেক্সট সেকশন */}
                            <div 
                                className={`
                                    w-full md:w-2/3 text-center md:text-left
                                    ${isImageOnLeft ? 'md:pl-10' : 'md:pr-10'}
                                `}
                            >
                                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-base">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturesSection;