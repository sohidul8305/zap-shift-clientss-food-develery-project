import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan, FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch parcels
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Delete parcel
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
          if (res.data.deletedCount > 0 || res.data.success) {
            refetch();
            Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
          }
        } catch (error) {
          console.error("Delete Error:", error);
          Swal.fire("Error!", "Failed to delete parcel.", "error");
        }
      }
    });
  };

  // Payment handler
  const handlePayment = async (parcel) => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
    };

    try {
      const res = await axiosSecure.post("/payment-checkout-session", paymentInfo);
      if (res.data.url) {
        window.location.assign(res.data.url);
      }
    } catch (err) {
      console.error("Payment error:", err);
      Swal.fire("Error!", "Failed to initiate payment.", "error");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">All My Parcels: {parcels.length}</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Delivery Status</th>
              <th>Payment Status</th>
              <th>Tracking ID</th>
              <th>Ordered Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName || "N/A"}</td>
                <td>{parcel.cost ? parcel.cost + " tk" : "N/A"}</td>
                <td>{parcel.deliveryStatus || "Pending"}</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-bold">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-primary btn-sm text-black"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.trackingId || "N/A"}</td>
                <td>{parcel.createdAt ? new Date(parcel.createdAt).toLocaleString() : "N/A"}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-square hover:bg-primary">
                      <FaMagnifyingGlass />
                    </button>
                    <button className="btn btn-square hover:bg-primary">
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
