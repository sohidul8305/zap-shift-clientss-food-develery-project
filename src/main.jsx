import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider, } from "@tanstack/react-query";

import { router } from "./routes/router.jsx";
import Authprovider from "./contexts/AuthContext/Authprovider.jsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
        <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>
);
