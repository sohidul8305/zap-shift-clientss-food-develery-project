import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchPaymentSuccess = async () => {
      try {
        const res = await axiosSecure.patch(`/payment-success?session_id=${sessionId}`);
        setPaymentInfo(res.data);
      } catch (err) {
        console.error("Payment success error:", err);
      }
    };

    fetchPaymentSuccess();
  }, [sessionId, axiosSecure]);

  if (!paymentInfo) {
    return <h2 className="text-3xl font-bold text-center mt-20">Processing Payment...</h2>;
  }

  return (
    <div className="p-10 max-w-xl mx-auto text-center border rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold text-green-600">🎉 Payment Successful!</h2>

      <p className="text-lg mt-4">Your payment has been processed successfully.</p>

      <div className="mt-6 bg-gray-100 p-5 rounded-lg text-left">
        <p><strong>Transaction ID:</strong> {paymentInfo.transactionId}</p>
        <p><strong>Tracking ID:</strong> {paymentInfo.trackingId}</p>
        <p><strong>Message:</strong> {paymentInfo.message}</p>
        <p><strong>Status:</strong> Paid</p>
      </div>

      <a
        href="/dashboard/payment-history"
        className="btn btn-primary mt-6"
      >
        View Payment History
      </a>
    </div>
  );
};

export default PaymentSuccess;
