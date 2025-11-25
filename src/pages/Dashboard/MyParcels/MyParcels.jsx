import React from 'react';
import { useQuery } from '@tanstack/react-query';   // ⬅ গুরুত্বপূর্ণ
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['my-parcels', user?.email],
        enabled: !!user?.email,   // ⬅ user loaded না হলে query run হবে না
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
     
        }
    });

         

    return (
        <div>
            <h2>All of my parcels : {parcels.length}</h2>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Cost</th>
        <th>Payment Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
  {
    parcels.map((parcel, index) => (
      <tr key={parcel._id}>
        <th>{index + 1}</th>
        <td>{parcel.parcelName}</td>
        <td>{parcel.cost}</td>
        <td>{parcel.deliveryStatus}</td>
      </tr>
    ))
  }
</tbody>
  </table>
</div>
        </div>
    );
};

export default MyParcels;
