import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { FaUserShield } from 'react-icons/fa';
import { FiShieldOff } from "react-icons/fi";

const UsersManagement = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch users
    const { data: users = [], isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Delete user
    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const res = await axiosSecure.delete(`/users/${userId}`);
            if (res.data.deletedCount > 0 || res.data.message === 'User deleted successfully') {
                alert('User deleted successfully');
                queryClient.invalidateQueries(['users']); // Auto-refresh
            }
        } catch (err) {
            console.error(err);
            alert('Failed to delete user');
        }
    };

    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error loading users.</p>;

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

    return (
        <div>
            <h2 className='text-4xl'>Manage Users: {users.length}</h2>
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
                                            <img src={user.photoURL || 'https://via.placeholder.com/40'} alt={user.displayName || 'User'} />
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

                                    <button className="btn btn-primary btn-xs mr-2">Make Admin <FaUserShield size={25}></FaUserShield> </button>
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-error btn-xs">Delete
                                     <FiShieldOff size={25} />
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
