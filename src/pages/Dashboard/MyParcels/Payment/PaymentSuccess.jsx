// src/pages/Dashboard/Payment/PaymentSuccess.jsx

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);

          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-green-600">Payment Successful</h2>

      <p className="mt-4 text-xl">
        <strong>Your Transaction ID:</strong> {paymentInfo.transactionId}
      </p>

      <p className="mt-2 text-xl">
        <strong>Your Parcel Tracking ID:</strong> {paymentInfo.trackingId}
      </p>
    </div>
  );
};

export default PaymentSuccess;
