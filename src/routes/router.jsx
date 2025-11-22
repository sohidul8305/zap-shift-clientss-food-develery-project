import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Home/Coverage/Coverage";
import serviceCenters from '../../public/serviceCenters.json';
import AuthLayout from "../Layouts/AuthLayout";
import Register from "../pages/Auth/Login/Regoster/Register";
import Login from "../pages/Auth/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../pages/Rider/Rider";




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
           element: <PrivateRoutes><Rider></Rider></PrivateRoutes>
        },
   { 
        path: 'coverage',
        Component: Coverage,
        loader: () => serviceCenters // direct import, fetch লাগবে না
      }
    ]
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component : Login,

      },
      {
        path: 'register',
        Component: Register,
      }
    ]
  }
]);