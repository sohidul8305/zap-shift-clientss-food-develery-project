import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import ArgentImg from '../../assets/banner/agent-pending.png'
import Swal from 'sweetalert2';

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData() || [];
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  const riderRegion = useWatch({ control, name: "riderRegion" }); 

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter(c => c.region === region)
      .map(c => c.district);
  };

  const handleRiderApplication = async (data) => {
    console.log("Form submitted:", data);
axiosSecure.post('/riders', data)
.then(res => {
    if(res.data.insertedId) {
            Swal.fire({
                    postion: "top-end",
                    icon: "success",
                    title: "Your Application has been submited ",
                    showCancelButton: false,
                    timer: 2000
                  });
    }
})
  };



  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-4xl text-primary font-bold mb-8 text-center'>🌟 Be a Rider 🌟</h2>
      
      {/* মেইন কন্টেইনার: বামে ফর্ম, ডানে ইমেজ */}
      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* বাম পাশ: ফর্ম (lg:w-1/2) */}
        <div className="lg:w-1/2">
          <form onSubmit={handleSubmit(handleRiderApplication)} className="p-4 bg-white rounded-lg shadow-2xl border border-gray-100">
            <h3 className="text-3xl font-semibold mb-6 text-gray-800">Application Form</h3>

            {/* ফর্মের দুটি কলাম (Rider Details এবং More Details) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Rider Details */}
              <div className="space-y-4">
                <h4 className="text-xl font-medium mb-4 border-b pb-2">Your Information</h4>
                
                <label className="block text-sm font-medium text-gray-700">Rider Name</label>
                <input type="text" {...register("riderName")} className="input input-bordered w-full" required />
                
                <label className="block text-sm font-medium text-gray-700">Rider Email</label>
                {/* ***পরিবর্তন: ডিফল্ট ভ্যালু এবং readOnly অ্যাট্রিবিউট বাদ দেওয়া হলো*** */}
                <input type="email" {...register("riderEmail")} className="input input-bordered w-full" required /> 
                
                <label className="block text-sm font-medium text-gray-700">Rider Region</label>
                <select {...register("riderRegion")} className="select select-bordered w-full" required>
                  <option value="">Pick a region</option>
                  {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                </select>
                
                <label className="block text-sm font-medium text-gray-700">District</label>
                <select {...register("district")} className="select select-bordered w-full" required>
                  <option value="">Pick a district</option>
                  {districtsByRegion(riderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                </select>
                
                <label className="block text-sm font-medium text-gray-700">Your Address</label>
                <input type="text" {...register("address")} className="input input-bordered w-full" required />
                
                <label className="block text-sm font-medium text-gray-700">Phone No</label>
                <input type="tel" {...register("phoneNo")} className="input input-bordered w-full" required />
              </div>

              {/* More Details */}
              <div className="space-y-4">
                <h4 className="text-xl font-medium mb-4 border-b pb-2">Vehicle & Documents</h4>
                
                <label className="block text-sm font-medium text-gray-700">Driving Licence No</label>
                <input type="text" {...register("drivingLicenseNo")} className="input input-bordered w-full" required />
                
                <label className="block text-sm font-medium text-gray-700">National NID No</label>
                <input type="text" {...register("nationalIdNo")} className="input input-bordered w-full" required />
                
                <label className="block text-sm font-medium text-gray-700">Bike Brand, Model and Year</label>
                <input type="text" {...register("bikeModel")} className="input input-bordered w-full" required />
                
                <label className="block text-sm font-medium text-gray-700">Bike Registration Number</label>
                <input type="text" {...register("bikeRegistrationNo")} className="input input-bordered w-full" required />

                <label className="block text-sm font-medium text-gray-700">Tell us About Yourself (Short Bio)</label>
                <textarea {...register("bio")} className="textarea textarea-bordered w-full" rows={3} required></textarea>
                
                <label className="block text-sm font-medium text-gray-700">Reference Phone Number (Optional)</label>
                <input type="tel" {...register("referencePhoneNo")} className="input input-bordered w-full" />
              </div>
            </div>

            <input 
              type="submit" 
              className="btn btn-primary mt-8 w-full text-white text-lg hover:bg-primary-focus" 
              value="Submit Rider Application" 
            />
          </form>
        </div>

        {/* ডান পাশ: ইমেজ (lg:w-1/2) */}
        <div className="lg:w-1/2 flex justify-center items-start pt-10">
          <img 
            src={ArgentImg} 
            alt="Agent Pending Banner"
            className="rounded-lg shadow-xl max-w-full h-auto" 
          />
        </div>
      </div>
    </div>
  );
};

export default Rider;