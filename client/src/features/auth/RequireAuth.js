import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { selectCurrentToken } from "./authSlice";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  // const token = useSelector(selectCurrentToken);
  const location = useLocation();
  const { roles } = useAuth();

  // console.log("TOKEN: ", token);
  console.log("LOCATION: ", location);

  const content = roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/login", state: { from: location } }} />
  );

  return content;
};

export default RequireAuth;
