// src/pages/dashboard/PaymentHistory.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const userEmail = user?.email || "";

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payments", userEmail],
    enabled: !!userEmail, // userEmail না থাকলে request চলবে না
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${encodeURIComponent(userEmail)}`);
      return res.data;
    },
  });

  if (!userEmail) {
    return <div className="p-4">Login করুন অথবা অপেক্ষা করুন...</div>;
  }

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4">Error loading payments</div>;

  return (
    <div className="p-4">
      <h2 className="text-4xl text-green-500">Payment History: {payments.length}</h2>

      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Name</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Payment Status</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, i) => (
              <tr key={p._id || `${p.transactionId}-${i}`}>
                <td>{i + 1}</td>
                <td>{p.parcelName}</td>
                <td>${p.amount}</td>
                <td>{p.transactionId}</td>
                <td>{p.paymentStatus}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;