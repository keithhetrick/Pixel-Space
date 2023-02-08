import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../hooks/useErrorMessage";
import axios from "axios";

const CreateUser = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  // make a new user with a POST request
  const createUser = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/user", {
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`http://localhost:8000/api/user`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: userName,
  //         email: userEmail,
  //         password: userPassword,
  //         confirmPassword: userConfirmPassword,
  //       }),
  //     });
  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("RESULT:", result);
  //       navigate(`/user/${result?.data._id}`);
  //     }
  //   } catch (err) {
  //     setErrors(err);
  //     console.log("ERROR:", err);
  //     alert(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="font-inter font-bold text-3xl text-gray-700 mb-4">
        New User
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
    </div>
  );
};

export default CreateUser;
