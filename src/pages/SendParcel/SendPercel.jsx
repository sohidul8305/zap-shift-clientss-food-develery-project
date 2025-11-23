import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";

const SendPercel = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const serviceCenters = useLoaderData(); 
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });


  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter(c => c.region === region)
      .map(c => c.district);
  };

  const handleSendPrecel = (data) => {
    console.log("FORM DATA:", data);

    const isDocument = data.parceltype === 'document';


    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;
    if(isDocument){
      cost = isSameDistrict ? 60 : 80;
    }
    else {
         if(parcelWeight < 3 ){
          cost = isSameDistrict ? 110 : 150; 
         }
         else{
          const minCharge = isSameDistrict ? 110 : 150;
          const extraWeight = parcelWeight -3;
          const extraCharge = isSameDistrict ? extraWeight * 40 :
          extraWeight * 40 + 40;

          cost = minCharge + extraCharge;

         }
    }
    console.log('cost', cost)
  };

  return (
    <div>
      <h2 className="text-5xl font-bold mt-5">Send A Parcel</h2>
      <h2 className="text-3xl font-bold mt-5">Enter Your Parcel Details</h2>

      <form onSubmit={handleSubmit(handleSendPrecel)} className="mt-12 p-4 text-black">
        {/* Parcel Type */}
        <div>
          <label className="label mr-4">
            <input type="radio" {...register('parcelType')} value="document" className="radio" defaultChecked />
            Document
          </label>
          <label className="label">
            <input type="radio" {...register('parcelType')} value="non-document" className="radio" />
            Non-Document
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input type="text" {...register('parcelName')} className="input w-full" placeholder="Parcel Name" />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input type="number" {...register('parcelWeight')} className="input w-full" placeholder="Parcel Weight" />
          </fieldset>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Sender Details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Sender Details</h4>
            <label className="label">Sender Name</label>
            <input type="text" {...register('senderName')} className="input w-full" placeholder="Sender Name" />

            <label className="label">Sender Email</label>
            <input type="text" {...register('senderEmail')} className="input w-full" placeholder="Sender Email" />

            <label className="label mt-4">Sender Region</label>
            <select {...register('senderRegion')} className="select w-full">
              <option value="">Pick a region</option>
              {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>

            <label className="label mt-4">Sender District</label>
            <select {...register('senderDistrict')} className="select w-full">
              <option value="">Pick a district</option>
              {districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>

            <label className="label mt-4">Sender Address</label>
            <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

            <label className="label mt-4">Sender Phone No</label>
            <input type="text" {...register('senderPhoneNo')} className="input w-full" placeholder="Sender Phone No" />

            <label className="label mt-4">Pickup Instruction</label>
            <textarea
              {...register("pickupInstruction")}
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Pickup Instruction"
              rows={4}
            />
          </fieldset>

          {/* Receiver Details */}
          <fieldset className="fieldset">
            <h4 className="text-2xl font-semibold">Receiver Details</h4>

            <label className="label">Receiver Name</label>
            <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

            <label className="label">Receiver Email</label>
            <input type="text" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

            <label className="label mt-4">Receiver Region</label>
            <select {...register('receiverRegion')} className="select w-full">
              <option value="">Pick a region</option>
              {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>

            <label className="label mt-4">Receiver District</label>
            <select {...register('receiverDistrict')} className="select w-full">
              <option value="">Pick a district</option>
              {districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>

            <label className="label mt-4">Receiver Address</label>
            <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

            <label className="label mt-4">Delivery Instruction</label>
            <textarea
              {...register("deliveryInstruction")}
              className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Delivery Instruction"
              rows={4}
            />
          </fieldset>

        </div>

        <input type="submit" className="btn btn-primary mt-8 text-black" value="Send Parcel" />
      </form>
    </div>
  );
};

export default SendPercel;
