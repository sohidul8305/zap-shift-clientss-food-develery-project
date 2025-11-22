import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router";


import App from './App.jsx'
import { router } from './routes/router.jsx'
import Authprovider from './contexts/AuthContext/Authprovider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
<Authprovider>
    <RouterProvider router={router} />
</Authprovider>
  </StrictMode>,
)
