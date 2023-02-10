import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";

import axios from "axios";

import ErrorMessage from "../hooks/useErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  console.log("ERRORS", errors);

  // useHeaderButton title & link
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Logout";
    button.href = "https://localhost:8000/auth/logout";

    //   <a
    //   className="font-inter font-medium bg-[#ffffff] text-gray-700 px-4 py-2 rounded-md hover:bg-[#f2f2f2] hover:translate-y-[-1px] transition duration-200 mt-4"
    //   href="https://localhost:8000/auth/logout"
    // >
    //   Logout
    // </a>
  }, []);

  // URL'S
  const loginUrl = "https://localhost:8000/api/login";

  const loginUser = async () => {
    try {
      const response = await axios.post(loginUrl, {
        email: userEmail,
        password: userPassword,
      });
      setUser({
        name: response.data.name,
        email: response.data.email,
      });
    } catch (error) {
      setErrors(error.response.data.message);
      console.log("ERROR", error.response);
    }
  };
  console.log("ERRORS STATE", errors);
  console.log("MESSAGE VARIANT", errors ? "danger" : "success");

  // create a function that navigates to user view page with user id
  const navigateToUserView = () => {
    navigate(`/user/${user._id}`, { state: user });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="font-inter font-bold text-3xl text-gray-700 mb-4">
        Login
      </h2>

      {errors && (
        <ErrorMessage
          variant={errors ? "danger" : "success"}
          message={errors}
        />
      )}

      <form
        className="flex flex-col w-64"
        onSubmit={(e) => {
          e.preventDefault();
          loginUser();
        }}
      >
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#6469ff] transition duration-200 mb-2"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#6469ff] transition duration-200 mb-2"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
          type="submit"
          onClick={navigateToUserView}
        >
          Login
        </button>
      </form>

      {/* make modal for social login popup for Google */}
      <div className="flex items-center justify-center mt-4">
        <div className="w-10 h-0.5 bg-gray-300"></div>
        <p className="font-inter font-medium text-gray-500 mx-2">Or</p>
        <div className="w-10 h-0.5 bg-gray-300"></div>
      </div>

      <div className="flex flex-col w-[16.5rem]">
        <a href="https://localhost:8000/auth/google">
          <GoogleLoginButton className="hover:bg-[#f2f2f2] hover:translate-y-[-1px] transition duration-200" />
        </a>
      </div>

      {/* <p>Here is your secret:</p>
      <a href="https://localhost:8000/secret">Secret</a>
      <br /> */}
      {/* <a href="https://localhost:8000/auth/google">Login with Google</a>
      <br /> */}

      <p className="font-inter font-medium text-gray-500 mt-4">
        Don't have an account?{" "}
        <span
          className="text-[#6469ff] cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Create one
        </span>
      </p>
    </div>
  );
};

export default Login;
