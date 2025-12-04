import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaCheck, FaTimes, FaTrashAlt } from 'react-icons/fa';

const AppreveRiders = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ===================
  // 1️⃣ Fetch All Riders
  // ===================
  const { data: riders = [], isLoading, isError } = useQuery({
    queryKey: ['riders'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    }
  });

  // =============================
  // 2️⃣ Approve / Reject Mutation
  // =============================
  const { mutateAsync: statusMutate } = useMutation({
    mutationFn: async ({ id, newStatus, email }) => {
      await axiosSecure.patch(`/riders/${id}`, { status: newStatus, email });
      return { id, newStatus };
    },
    onMutate: async ({ id, newStatus }) => {
      await queryClient.cancelQueries(['riders']);
      const previousRiders = queryClient.getQueryData(['riders']);

      queryClient.setQueryData(['riders'], oldData =>
        oldData.map(rider =>
          rider._id === id ? { ...rider, status: newStatus } : rider
        )
      );


      return { previousRiders };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(['riders'], context.previousRiders);
      // কোনো Swal error দেখানো হবে না
    },
    onSettled: () => {
      queryClient.invalidateQueries(['riders']);
    }
  });

  // ===================
  // 3️⃣ Delete Mutation
  // ===================
  const { mutateAsync: deleteMutate } = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/riders/${id}`);
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData(['riders'], oldData =>
        oldData.filter(rider => rider._id !== id)
      );
      Swal.fire("Deleted!", "Rider removed permanently.", "success");
    }
  });

  // ===================
  // Handlers
  // ===================
  const handleApprove = (rider) => {
    Swal.fire({
      title: `Approve ${rider.riderName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Approve"
    }).then(result => {
      if (result.isConfirmed) {
        statusMutate({ id: rider._id, newStatus: "approved", email: rider.riderEmail });
      }
    });
  };

  const handleReject = (rider) => {
    Swal.fire({
      title: `Reject ${rider.riderName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Reject"
    }).then(result => {
      if (result.isConfirmed) {
        statusMutate({ id: rider._id, newStatus: "rejected", email: rider.riderEmail });
      }
    });
  };

  const handleRemove = (rider) => {
    Swal.fire({
      title: `Remove ${rider.riderName}?`,
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Remove"
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutate(rider._id);
      }
    });
  };

  // ===================
  // Badge Styling
  // ===================
  const getStatusBadgeClasses = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700 font-bold";
      case "rejected":
        return "bg-red-100 text-red-600 font-bold";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 font-bold";
    }
  };

  // ===================
  // Loading / Error
  // ===================
  if (isLoading) return <h2 className="text-center py-10">Loading…</h2>;
  if (isError) return <h2 className="text-center py-10 text-red-500">Error loading data</h2>;

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h2 className='text-4xl font-bold mb-6'>
        🛵 Riders: <span className="text-primary">{riders.length}</span>
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Rider Info</th>
              <th>Location</th>
              <th>Documents</th>
              <th>Bike</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id} className="hover:bg-blue-50">
                <th>{index + 1}</th>
                <td>
                  <strong>{rider.riderName}</strong>
                  <div className="text-sm opacity-60">{rider.riderEmail}</div>
                  <div className="text-sm opacity-60">Phone: {rider.phoneNo}</div>
                </td>
                <td>{rider.district}, {rider.riderRegion}</td>
                <td>
                  License: {rider.drivingLicenseNo} <br />
                  NID: {rider.nationalIdNo}
                </td>
                <td>
                  {rider.bikeModel}<br />
                  <span className="text-sm opacity-60">Reg: {rider.bikeRegistrationNo}</span>
                </td>
                <td>
                  <span className={`badge badge-lg ${getStatusBadgeClasses(rider.status)}`}>
                    {rider.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button className="btn btn-sm btn-success" onClick={() => handleApprove(rider)}><FaCheck /></button>
                  <button className="btn btn-sm btn-error" onClick={() => handleReject(rider)}><FaTimes /></button>
                  <button className="btn btn-sm bg-gray-600 text-white" onClick={() => handleRemove(rider)}><FaTrashAlt /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppreveRiders;