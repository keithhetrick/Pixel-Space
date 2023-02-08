import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderLoginButton = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <button
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
          onClick={() => navigate("/create-post")}
        >
          Create
        </button>
      ) : (
        <button
          className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}

      {user && (
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1612092111868-27a5e7c0c5e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="user"
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <p className="text-sm font-medium text-gray-700">{user.name}</p>
        </div>
      )}
    </div>
  );
};

export default HeaderLoginButton;
