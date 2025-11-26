import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch  } = useQuery({
    queryKey: ["my-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.delete(`/parcels/${id}`)
    .then(res => {
        console.log(res.data);

           if(res.data.deletedCount){
            // refesh data in the ui
            refetch()
          Swal.fire({
      title: "Deleted!",
      text: "Your parcel request has been deleted.",
      icon: "success"
    });
    }
    })
  }
});
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
              <th>Status</th>
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
                <td>{parcel.paymentStatus || "Pending"}</td>
                <td>
                  {parcel.createdAt
                    ? new Date(parcel.createdAt).toLocaleString()
                    : "N/A"}
                </td>
                <td>
                  <div className="flex">
                    <button className="btn btn-squre hover:bg-primary">
                      <FaMagnifyingGlass />
                    </button>
                    <button
                     
                      className="btn btn-squre hover:bg-primary mx-2"
                    >
                     <FaEdit />
                    </button>
                    <button
                     onClick={() => handleDelete(parcel._id)}
                    className="btn btn-squre hover:bg-primary">
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
