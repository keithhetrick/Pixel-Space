import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorMessage from "../../hooks/useErrorMessage";

import axios from "axios";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(id);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  const fetchSingleUserUrl = `https://localhost:8000/api/user/${userId}`;

  const fetchSingleUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(fetchSingleUserUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const result = response?.data;
        setUserData(result?.data);
        setUserId(result?.data._id);
        setUserEmail(result?.data.email);
        setUserName(result?.data.name);
        setUserPassword(result?.data.password);
        setUserConfirmPassword(result?.data.confirmPassword);
        console.log("FETCHING USER RESULT:", result?.data);
      }
    } catch (error) {
      setErrors(error);
      console.log("ERROR:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(fetchSingleUserUrl, {
        name: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
      });

      if (response.status === 200) {
        const result = response.data;
        console.log("HANDLE UPDATE USER SUBMIT:", result);
        navigate(`/user/${userId}`);
      }
    } catch (error) {
      setErrors(error.response.data.message);
      console.log("ERROR", error.response);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUserSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.delete(fetchSingleUserUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const result = await response.data;
        console.log("HANDLE DELETE USER SUBMIT:", result);
        navigate(`/`);
      }
    } catch (err) {
      setErrors(err);
      console.log("ERROR:", err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full">
      {userData ? (
        <div className="px-6 text-gray-800">
          <div className="flex flex-col items-center justify-center w-full">
            <div>
              {loading && <p>Loading...</p>}
              <h1 className="font-inter font-bold text-4xl text-gray-700 w-full mb-6">
                Edit User
              </h1>
            </div>

            {errors && (
              <ErrorMessage
                variant={errors ? "danger" : "success"}
                message={errors}
              />
            )}

            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={handleUpdateUserSubmit}>
                <div className="mb-6">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={userName || ""}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    value={userEmail || ""}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={userPassword || ""}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={userConfirmPassword || ""}
                    onChange={(e) => setUserConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="text-center lg:text-left">
                  <button
                    className="mb-6 px-7 py-3 bg-[#6469] text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg hover:bg-[#b18eb199] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Update User
                  </button>

                  <button
                    className="px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    onClick={handleDeleteUserSubmit}
                  >
                    Delete User
                  </button>

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                  </div>
                </div>
              </form>
              <button
                className="px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={() => navigate(`/user/${userId}`)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="font-inter font-bold text-4xl text-gray-700 w-full mb-6">
            No User
          </h1>
          <button
            className="px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
            type="submit"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            onClick={() => navigate("/user")}
          >
            Back
          </button>
        </div>
      )}
    </section>
  );
};

export default EditUser;
