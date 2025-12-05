import React from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AssignDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user.email, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });



  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-5">
        Assigned Deliveries: {parcels.length}
      </h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No parcels assigned yet.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th>#</th>
                <th>Parcel</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Address</th>
                <th>Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>

                  {/* Parcel */}
                  <td>
                    <strong>{parcel.parcelName}</strong>
                    <br />
                    <span className="text-xs opacity-60">
                      {parcel.createdAt
                        ? new Date(parcel.createdAt).toLocaleString()
                        : "N/A"}
                    </span>
                  </td>

                  {/* Sender */}
                  <td>
                    <strong>{parcel.senderName}</strong>
                    <br />
                    <span className="text-xs opacity-60">
                      {parcel.senderEmail}
                    </span>
                  </td>

                  {/* Receiver */}
                  <td>
                    <strong>{parcel.receiverName}</strong>
                    <br />
                    <span className="text-xs opacity-60">
                      {parcel.receiverPhone}
                    </span>
                  </td>

                  {/* Address */}
                  <td>
                    {parcel.receiverAddress} <br />
                    <span className="text-xs opacity-60">
                      {parcel.receiverDistrict}
                    </span>
                  </td>

                  {/* Cost */}
                  <td>{parcel.cost ? parcel.cost + "৳" : "N/A"}</td>

                  {/* Status */}
                  <td>
                    <span className="badge badge-warning">
                      {parcel.deliveryStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignDeliveries;
