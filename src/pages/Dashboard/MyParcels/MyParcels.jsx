import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This parcel will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/parcels/${id}`);

          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Delete Error:", error);
          Swal.fire("Error!", "Failed to delete parcel.", "error");
        }
      }
    });
  };

const handlePayment = async (parcel) => {
  const paymentInfo = {
    cost: parcel.cost,
    parcelId: parcel._id,
    senderEmail: parcel.senderEmail,
    parcelName: parcel.parcelName,
  };

  const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);

  window.location.assign(res.data.url);
};


  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">
        All My Parcels : {parcels.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Cost</th>
              <th> Delevery Status</th>
              <th>Payment</th>
              <th>Ordered</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost ? parcel.cost + " tk" : "N/A"}</td>
                <td>{parcel.deliveryStatus || "Pending"}</td>
                {
                  parcel.paymentStatus === 'paid' ? <span className="green-400">paid</span>
                  : 
               <button onClick={ () => handlePayment(parcel)} className="btn btn-primary btn-small text-black">Pay</button>
                }
                <td>
                  {parcel.createdAt
                    ? new Date(parcel.createdAt).toLocaleString()
                    : "N/A"}
                </td>

                <td>
                  <div className="flex">
                    <button className="btn btn-square hover:bg-primary">
                      <FaMagnifyingGlass />
                    </button>

                    <button className="btn btn-square hover:bg-primary mx-2">
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(parcel._id)}
                      className="btn btn-square hover:bg-primary"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
