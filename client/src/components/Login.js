// make a login component

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="font-inter font-bold text-3xl text-gray-700 mb-4">
        Login
      </h2>

      <form className="flex flex-col w-64">
        <input
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#6469ff] transition duration-200 mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:border-[#6469ff] transition duration-200 mb-2"
        />
        <button
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
          onClick={(e) => {
            e.preventDefault();
            setUser({
              name: "John Doe",
              email: "",
            });
            navigate("/");
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
