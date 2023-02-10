import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";

import axios from "axios";

import ErrorMessage from "../hooks/useErrorMessage";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  // useHeaderButton title & link
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "See Users";
    button.href = "/user/view";
  }, []);

  const createUserUrl = "https://localhost:8000/api/user";

  const createUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post(createUserUrl, {
        name: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
      });
      console.log("RESPONSE", response);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setErrors(error.response.data.message);
      // setLoading(false);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="font-inter font-bold text-3xl text-gray-700 mb-4">
        Register
      </h2>

      {loading && <p>Loading...</p>}
      {errors && (
        <ErrorMessage
          variant={errors ? "danger" : "success"}
          message={errors}
        />
      )}

      <form className="flex flex-col w-64" onSubmit={handleSubmit}>
        <input
          className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#6469ff] transition duration-200 mb-2"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#6469ff] transition duration-200 mb-2"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#6469ff] transition duration-200 mb-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <input
          className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#6469ff] transition duration-200 mb-2"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm Password"
          onChange={(e) => setUserConfirmPassword(e.target.value)}
        />
        <button
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
          type="submit"
        >
          Sign Up
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
          <GoogleLoginButton className="hover:bg-[#f2f2f2] hover:translate-y-[-1px] transition duration-200">
            <span>Sign up with Google</span>
          </GoogleLoginButton>
        </a>

        {/* <FacebookLoginButton className="bg-[#4267b2] text-white rounded-md hover:bg-[#344e86] hover:translate-y-[-1px] transition duration-200" /> */}
      </div>

      <p className="font-inter font-medium text-gray-500 mt-4">
        Already have an account?{" "}
        <span
          className="text-[#6469ff] cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Sign In
        </span>
      </p>
    </div>
  );
};

export default Register;