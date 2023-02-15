import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../features/users/usersApiSlice";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ErrorMessage from "../../hooks/useErrorMessage";

import { Loader } from "../../components";

const EditUser = ({ data }) => {
  const { id } = useParams();

  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const deleteUser = useDeleteUserMutation();

  console.log("EDIT USER PAGE REDUX DATA", data);
  console.log("EDIT USER PAGE REDUX DATA - USER ID:", id);

  const [userName, setUserName] = useState(
    data?.data?.name ? data?.data?.name : ""
  );
  const [userEmail, setUserEmail] = useState(
    data?.data?.email ? data?.data?.email : ""
  );
  const [userPassword, setUserPassword] = useState(
    data?.data?.password ? data?.data?.password : ""
  );
  const [userConfirmPassword, setUserConfirmPassword] = useState(
    data?.data?.confirmPassword ? data?.data?.confirmPassword : ""
  );

  console.log(
    "EDIT USER PAGE - STATE DATA:",
    userName,
    userEmail,
    userPassword,
    userConfirmPassword
  );

  const navigate = useNavigate();

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // set Errors to ErrorMessage component via setErrors
  useEffect(() => {
    if (data?.error) {
      setErrors(data?.error);
    }
  }, [data]);

  // PERSIST DATA IN STATE UPON PAGE LOAD/PAGE REFRESH
  useEffect(() => {
    if (data?.data?.name) {
      setUserName(data?.data?.name);
    }
    if (data?.data?.email) {
      setUserEmail(data?.data?.email);
    }
    if (data?.data?.password) {
      setUserPassword(data?.data?.password);
    }
    if (data?.data?.confirmPassword) {
      setUserConfirmPassword(data?.data?.confirmPassword);
    }
  }, [data]);

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();

    if (userPassword !== userConfirmPassword) {
      setErrors("Passwords do not match");
      return;
    }

    try {
      await updateUser({
        _id: id,
        name: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
      }).unwrap();
      navigate("/users/view");
    } catch (error) {
      setErrors(error.data?.message);
      console.log("ERROR", error.data?.message);
    }
  };

  const handleDeleteUserSubmit = async () => {
    try {
      await deleteUser({ _id: data?.data?._id }).unwrap();
      console.log(`User ${data?.data?._id} deleted`);
      navigate("/users/view");
    } catch (error) {
      setErrors(error.data?.message);
      console.log("ERROR", error.data?.message);
    }
  };

  return (
    <section className="h-full">
      {isLoading && (
        <div className="pb-6 flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!isLoading || data ? (
        <div className="px-6 text-gray-800">
          <div className="flex flex-col items-center justify-center w-full">
            <div>
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                    autoComplete="off"
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
                onClick={() => navigate(`/users/${data?.data?._id}`)}
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
            onClick={() => navigate("/users/view")}
          >
            Back
          </button>
        </div>
      )}
    </section>
  );
};

export default EditUser;
