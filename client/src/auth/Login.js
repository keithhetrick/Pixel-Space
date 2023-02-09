import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import ErrorMessage from "../hooks/useErrorMessage";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // useHeaderButton title & link
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Back";
    button.href = "/";
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
      const id = user?._id;
      console.log("USER ID", id);
      // navigate("/");
      navigate(`/user/${user?._id}`);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  };
  console.log("ERRORS STATE", errors);
  console.log("MESSAGE VARIANT", errors ? "danger" : "success");

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
        >
          Login
        </button>
      </form>

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
