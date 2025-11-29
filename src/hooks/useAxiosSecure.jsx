import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user?.accessToken) return;

    // REQUEST INTERCEPTOR
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;

        // Token invalid → logout & redirect
        if (status === 401 || status === 403) {
          logOut().finally(() => {
            navigate("/login", {
              state: { from: location },
              replace: true,
            });
          });
        }

        return Promise.reject(error);
      }
    );

    // CLEANUP
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user?.accessToken, logOut, navigate, location]);

  return axiosSecure;
};

export default useAxiosSecure;
