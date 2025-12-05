import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";
import Forbidden from "../components/Forebidden/Forebidden";

const RiderRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  console.log("RIDER ROUTE - USER:", user?.email);
  console.log("RIDER ROUTE - ROLE:", role);

  if (loading || roleLoading) return <Loading />;

  if (!user) return <Forbidden />;

  if (role !== "rider") {
    return <Forbidden />;
  }

  return children;
};

export default RiderRoute;
