import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  console.log("TOKEN", token);

  let isAdmin = false;
  let isUser = false;
  let status = "User";

  if (token) {
    const decoded = jwtDecode(token);
    console.log("\nDECODED JWT", decoded);

    const { email, roles } = decoded.UserInfo;

    isUser = roles.includes(0);
    isAdmin = roles.includes(1);

    if (isAdmin) {
      status = "Admin";
    } else if (isUser) {
      status = "User";
    }

    return { email, roles, status, isAdmin, isUser };
  }

  return { email: "", roles: [], status, isAdmin, isUser };
};

export default useAuth;
