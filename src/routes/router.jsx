import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },

      {
        path: 'rider',
        element: <PrivateRoutes><Rider /></PrivateRoutes>
      },

      {
        path: 'send-parcel',
        element: <PrivateRoutes><SendPercel /></PrivateRoutes>,
        loader: () => 
          fetch('/serviceCenters.json')
            .then(res => {
              if (!res.ok) throw new Error('Failed to fetch service centers');
              return res.json();
            })
      },

      { 
        path: 'coverage',
        Component: Coverage,
        loader: () => 
          fetch('/serviceCenters.json')
            .then(res => {
              if (!res.ok) throw new Error('Failed to fetch service centers');
              return res.json();
            })
      }
    ]
  },

  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      }
      ,
      {
      path: 'dashboard',
      element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
     children: [
      {
          path: 'my-parcels',
          Component: MyParcels,
        
      }, 
      {
        path: 'payment/:parcelId',
       Component: Payment,

      },
      {
        path: 'payment-success',
       Component: PaymentSuccess,

      },
      {
        path: 'payment-cancel',
       Component: PaymentCancelled,

      }
     ]
      }
    ]
  }
]);
