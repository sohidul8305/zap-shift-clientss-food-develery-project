import React from 'react';

// ***** ১. আপনার ইমেজ ফাইলটি এখানে Import করুন *****
// নিশ্চিত করুন যে 'আপনার-ইমেজের-সঠিক-পাথ.png' আপনার ফাইল স্ট্রাকচারের সাথে সঠিক।
// উদাহরণস্বরূপ:
import PriorityIllustration from "../../assets/banner/location-merchant.png"; 


const PrioritySection = () => {
    const bgColor = 'bg-[#013237]';
    const primaryButtonColor = 'bg-[#9FE85A]';

    return (
        <div className="bg-gray-50 py-16 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className={`
                    ${bgColor} text-white p-8 md:p-16 rounded-2xl shadow-xl
                    flex flex-col lg:flex-row items-center justify-between
                    relative overflow-hidden
                `}>
                    {/* ব্যাকগ্রাউন্ডের অ্যাবস্ট্রাক্ট ডিজাইন/ওয়েভ (Tailwind দিয়ে সিমুলেশন) */}
                    {/* ছবির উপরের বাম দিকের হালকা প্যাটার্নটির জন্য */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-30">
                        <svg viewBox="0 0 100 100" className="absolute w-full h-full">
                            <path fill="none" stroke="white" strokeWidth="0.5" opacity="0.4" d="M0,20 C30,0 70,0 100,20 L100,100 L0,100 Z" />
                            <path fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" d="M0,30 C30,10 70,10 100,30 L100,100 L0,100 Z" />
                        </svg>
                    </div>

                    {/* বাম দিকের টেক্সট এবং বাটন কন্টেইনার */}
                    <div className="z-10 w-full lg:w-3/5 mb-10 lg:mb-0 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Merchant and Customer Satisfaction is Our First Priority
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-lg lg:max-w-none mx-auto lg:mx-0">
                            We offer the lowest delivery charge with the highest value along with
                            100% safety of your product. Pathao courier delivers your parcels in every
                            corner of Bangladesh right on time.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className={`
                                ${primaryButtonColor} text-gray-900 font-semibold py-3 px-8 rounded-lg
                                transition duration-300 hover:bg-white hover:text-gray-900
                            `}>
                                Become a Merchant
                            </button>
                            <button className={`
                                border border-white text-white font-semibold py-3 px-8 rounded-lg
                                transition duration-300 hover:bg-white hover:text-gray-900
                            `}>
                                Earn with ZapShift Courier
                            </button>
                        </div>
                    </div>

                    {/* ***** ২. এখানে আপনার ইমেজটি বসান ***** */}
                    {/* ডান দিকের ইমেজ/ইলাস্ট্রেশন কন্টেইনার */}
                    <div className="z-10 w-full lg:w-2/5 flex justify-center items-center p-4">
                        {/* আপনার ইলাস্ট্রেশন ফাইলটি এখানে `img` ট্যাগের `src` অ্যাট্রিবিউটে ব্যবহার করুন */}
                        {/* যদি আপনার image-এর ফাইলটি PriorityIllustration ভ্যারিয়েবলে থাকে: */}
                        <img 
                            src={PriorityIllustration} // <-- এখানে আপনার Import করা ইমেজের ভ্যারিয়েবলটি বসবে
                            alt="Delivery boxes illustration" 
                            className="w-full max-w-sm h-auto opacity-80" 
                            // ছবির Line Art ইফেক্টের জন্য opacity ব্যবহার করা হয়েছে
                        />
                        
                        {/* আগের ডামি div টি এখন আর দরকার নেই, কারণ আপনি আসল ইমেজ যোগ করছেন। */}
                        {/* <div className="w-full h-48 md:h-64 lg:h-80 flex items-center justify-center border-2 border-white/50 rounded-lg border-dashed">
                             <p className="text-gray-400 text-sm">Place your illustration/image here</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrioritySection;