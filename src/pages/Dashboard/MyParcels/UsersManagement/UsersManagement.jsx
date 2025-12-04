import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState('');

  // Fetch users
  const { data: users = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['users', searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    }
  });

  // Make Admin
  const handleMakeUser = async (user) => {
    const roleInfo = { role: 'admin' };

    const res = await axiosSecure.patch(`/users/${user._id}/role`, roleInfo);

    if (res.data.modifiedCount) {
      Swal.fire({
        position: "top-end",
        title: `${user.displayName} Marked as Admin`,
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      });

      refetch();
    }
  };

  // Delete User
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const res = await axiosSecure.delete(`/users/${userId}/role`);

    if (res.data.deletedCount > 0) {
      toast.success("User deleted successfully");
      queryClient.invalidateQueries(['users']);
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users.</p>;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  return (
    <div>
      <h2 className="text-4xl">Manage Users: {users.length}</h2>

      <label className="input ml-5">
        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>

        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          className="grow"
          placeholder="Search users"
        />
      </label>

      <div className="overflow-x-auto mt-8">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name / Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.photoURL || 'https://via.placeholder.com/40'}
                        alt={user.displayName || 'User'}
                      />
                    </div>
                  </div>
                </td>

                <td>
                  <div>
                    <div className="font-bold">{user.displayName || 'N/A'}</div>
                    <div className="text-sm opacity-50">{user.email}</div>
                  </div>
                </td>

                <td>
                  <span className={`badge badge-ghost badge-sm ${user.role === 'admin' ? 'badge-primary' : 'badge-neutral'}`}>
                    {user.role}
                  </span>
                </td>

                <td>{formatDate(user.createdAt)}</td>

                <th>
                  <button
                    onClick={() => handleMakeUser(user)}
                    className="btn btn-primary btn-xs mr-2"
                  >
                    Make Admin <FaUserShield size={20} />
                  </button>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-error btn-xs"
                  >
                    Delete <FiShieldOff size={20} />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name / Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
