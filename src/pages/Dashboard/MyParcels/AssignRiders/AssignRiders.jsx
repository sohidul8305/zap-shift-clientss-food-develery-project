import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const AssignRiders = () => {
    const [selectedParcel, setSelectedParcel] = useState(null);
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();

    const { data: parcels = [], refetch: parcelsRefetch } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup')
            return res.data;
        }
    })

  // =========================
  // Fetch available riders for selected parcel
  // =========================
    const { data: riders = [] } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel?.senderDistrict}&workStatus=available`);
            return res.data;
        }
    })


  // =========================
  // Open modal and set selected parcel
  // =========================
  const openAssignRiderModal = (parcel) => {
    setSelectedParcel(parcel);
    riderModalRef.current.showModal();
  };

  // =========================
  // Assign rider to parcel
  // =========================
  const handleAssignRider = async (riderId) => {
    if (!selectedParcel) return;

    try {
      const res = await axiosSecure.patch(`/parcels/${selectedParcel._id}/assign-rider`, {
        riderId,
      });

      if (res.data.success) {
        Swal.fire('Success!', 'Rider assigned successfully', 'success');
        riderModalRef.current.close();
        refetchParcels();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Failed to assign rider', 'error');
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">
        Assign Riders: {parcels.length}
      </h2>

      {/* Parcels Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Sender District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost ? parcel.cost + ' tk' : 'N/A'}</td>
                <td>{parcel.createdAt ? new Date(parcel.createdAt).toLocaleString() : 'N/A'}</td>
                <td>{parcel.senderDistrict || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm text-black"
                    onClick={() => openAssignRiderModal(parcel)}
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for riders */}
      <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Select Rider ({riders.length} available)
          </h3>
          <div className="py-4 space-y-2 max-h-60 overflow-y-auto">
            {riders.length > 0 ? (
              riders.map((rider) => (
                <div key={rider._id} className="flex justify-between items-center border p-2 rounded">
                  <div>
                    <strong>{rider.riderName}</strong> <br />
                    <span className="text-sm opacity-70">{rider.riderEmail}</span> <br />
                    <span className="text-sm opacity-70">{rider.district}</span>
                  </div>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleAssignRider(rider._id)}
                  >
                    Assign
                  </button>
                </div>
              ))
            ) : (
              <p>No available riders in this district.</p>
            )}
          </div>
          <div className="modal-action">
            <button className="btn" onClick={() => riderModalRef.current.close()}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRiders;
