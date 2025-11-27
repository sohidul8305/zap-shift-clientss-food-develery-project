import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const SendParcel = () => {
  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const serviceCenters = useLoaderData() || [];
  const regions = [...new Set(serviceCenters.map(c => c.region))];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const nevagite = useNavigate();

  const districtsByRegion = (region) => {
    if (!region) return [];
    return serviceCenters
      .filter(c => c.region === region)
      .map(c => c.district);
  };

  const handleSendParcel = async (data) => {
    const isDocument = data.parcelType === "document";
    const parcelWeight = parseFloat(data.parcelWeight || 0);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = extraWeight * 40 + (isSameDistrict ? 0 : 40);
        cost = minCharge + extraCharge;
      }
    }

    // Auto fill values (Backend এ যাবে)
    const parcelData = {
      ...data,
      parcelWeight,
      cost,
      senderEmail: user?.email,
      deliveryStatus: "Pending",
      paymentStatus: "Pending",
      bookingDate: new Date(),
    };

    Swal.fire({
      title: "Agree with the Cost?",
      text: `You will be charged ${cost} Taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue Payment!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        nevagite('/dashboard/my-parcels')
      
        try {
          await axiosSecure.post("/parcels", parcelData);
          Swal.fire({
            postion: "top-end",
            icon: "success",
            title: "Parcel has created. Please Pay",
            showCancelButton: false,
            timer: 2500
          });
        } catch (err) {
          console.log(err);
          Swal.fire("Error!", "Failed to submit parcel.", "error");
           
        }
      }
    });
  };

  return (
    <div className="p-5">
      <h2 className="text-5xl font-bold mt-5">Send A Parcel</h2>
      <h2 className="text-3xl font-bold mt-5">Enter Your Parcel Details</h2>

      <form onSubmit={handleSubmit(handleSendParcel)} className="mt-12 p-4 text-black">

        {/* Parcel Type */}
        <div className="mb-6">
          <label className="mr-4">
            <input type="radio" {...register("parcelType")} value="document" defaultChecked />
            Document
          </label>
          <label className="ml-6">
            <input type="radio" {...register("parcelType")} value="non-document" />
            Non-Document
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          <div>
            <label>Parcel Name</label>
            <input type="text" {...register("parcelName", { required: true })} className="input w-full" />
          </div>
          <div>
            <label>Parcel Weight (kg)</label>
            <input type="number" {...register("parcelWeight", { required: true })} className="input w-full" />
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Sender */}
          <div className="border p-4 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Sender Details</h3>

            <label>Sender Name</label>
            <input type="text" {...register("senderName")} className="input w-full mb-2" />

            <label>Sender Region</label>
            <select {...register("senderRegion")} className="select w-full mb-2">
              <option value="">Pick a region</option>
              {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>

            <label>Sender District</label>
            <select {...register("senderDistrict")} className="select w-full mb-2">
              <option value="">Pick a district</option>
              {districtsByRegion(senderRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>

            <label>Sender Address</label>
            <input type="text" {...register("senderAddress")} className="input w-full mb-2" />

            <label>Sender Phone No</label>
            <input type="text" {...register("senderPhoneNo")} className="input w-full mb-2" />

            <label>Pickup Instruction</label>
            <textarea {...register("pickupInstruction")} className="w-full p-2 border rounded" rows={4} />
          </div>

          {/* Receiver */}
          <div className="border p-4 rounded-md shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Receiver Details</h3>

            <label>Receiver Name</label>
            <input type="text" {...register("receiverName")} className="input w-full mb-2" />

            <label>Receiver Email</label>
            <input type="text" {...register("receiverEmail")} className="input w-full mb-2" />

            <label>Receiver Region</label>
            <select {...register("receiverRegion")} className="select w-full mb-2">
              <option value="">Pick a region</option>
              {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
            </select>

            <label>Receiver District</label>
            <select {...register("receiverDistrict")} className="select w-full mb-2">
              <option value="">Pick a district</option>
              {districtsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>

            <label>Receiver Address</label>
            <input type="text" {...register("receiverAddress")} className="input w-full mb-2" />

            <label>Delivery Instruction</label>
            <textarea {...register("deliveryInstruction")} className="w-full p-2 border rounded" rows={4} />
          </div>

        </div>

        <input type="submit" className="btn btn-primary mt-6 w-full md:w-auto" value="Send Parcel" />
      </form>
    </div>
  );
};

export default SendParcel;
