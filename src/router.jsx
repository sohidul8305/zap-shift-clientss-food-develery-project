import { createBrowserRouter } from "react-router";
import RootLayouts from "./Layouts/RootLayouts";
import Home from "./pages/Home/Home/Home";
import Coverage from "./pages/Home/Coverage/Coverage";
import serviceCenters from '../public/serviceCenters.json.json';



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
        path: 'coverage',
        Component: Coverage,
        loader: () => serviceCenters // direct import, fetch লাগবে না
      }
    ]
  },
]);