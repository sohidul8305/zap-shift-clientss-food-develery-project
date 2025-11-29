import { createBrowserRouter } from "react-router"; // react-router-dom
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Home/Coverage/Coverage";
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../pages/Auth/Login/Regoster/Register";
import Login from "../pages/Auth/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../pages/Rider/Rider";
import SendPercel from "../pages/SendParcel/SendPercel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/MyParcels/Payment/Payment";
import PaymentSuccess from "../pages/Dashboard/MyParcels/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/MyParcels/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/MyParcels/PaymentHistory/PaymentHistory";
import AppreveRiders from "../pages/Dashboard/MyParcels/ApproveRiders/AppreveRiders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "rider",
        element: <PrivateRoutes><Rider /></PrivateRoutes>,
        loader: () => fetch("/serviceCenters.json").then(res => res.json()),
      },
      {
        path: "send-parcel",
        element: <PrivateRoutes><SendPercel /></PrivateRoutes>,
        loader: () =>
          fetch("/serviceCenters.json")
            .then(res => {
              if (!res.ok) throw new Error("Failed to fetch service centers");
              return res.json();
            }),
      },
      {
        path: "coverage",
        element: <Coverage />,
        loader: () => 
          fetch("/serviceCenters.json")
            .then(res => {
              if (!res.ok) throw new Error("Failed to fetch service centers");
              return res.json();
            }),
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "dashboard",
        element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
        children: [
          {
            path: "my-parcels",
            element: <MyParcels />,
          },
          {
            path: "payment/:parcelId",
            element: <Payment />,
          },
          {
            path: "payment-history",
            element: <PaymentHistory />,
          },
          {
            path: "payment-success",
            element: <PaymentSuccess />,
          },
          {
            path: "payment-cancel",
            element: <PaymentCancelled />,
          },
          {
            path: "approve-riders",
            element: <AppreveRiders />,
          },
        ],
      },
    ],
  },
]);
