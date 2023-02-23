import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../features/users/usersApiSlice";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ErrorMessage from "../../hooks/useErrorMessage";

import { Loader } from "../../components";

const EditUser = ({ user }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  // console.log("EDIT USER PAGE REDUX DATA PASSED FROM WRAPPER", user);
  // console.log("EDIT USER PAGE REDUX DATA - USER ID:", id);

  let [isAdmin, setIsAdmin] = useState(false);

  // set isAdmin to true if user is admin under role field if roles array includes 1
  useEffect(() => {
    if (user?.data?.roles.includes(1)) {
      setIsAdmin(true);
    }
  }, [user]);

  const [userName, setUserName] = useState(
    user?.data?.name ? user?.data?.name : ""
  );
  const [userEmail, setUserEmail] = useState(
    user?.data?.email ? user?.data?.email : ""
  );
  const [userPassword, setUserPassword] = useState(
    user?.data?.password ? user?.data?.password : ""
  );
  const [userConfirmPassword, setUserConfirmPassword] = useState(
    user?.data?.confirmPassword ? user?.data?.confirmPassword : ""
  );

  // eslint-disable-next-line no-unused-vars
  const [userPosts, setUserPosts] = useState(
    user?.data?.posts ? user?.data?.posts : []
  );

  // eslint-disable-next-line no-unused-vars
  const [userPrompts, setUserPrompts] = useState(
    user?.data?.prompt ? user?.data?.prompt : []
  );

  // const [userRoles, setUserRoles] = useState(
  //   user?.data?.roles ? user?.data?.roles : []
  // );

  // // convert userRolesvalues from dropdown to numbers for the roles array
  // const convertRoles = (roles) => {
  //   const role = {
  //     User: 0,
  //     Admin: 1,
  //   };
  //   return role[roles];
  // };

  // console.log(userPosts);

  // const userPrompts = userPosts.map((post) => post.prompt);
  // const userImages = userPosts.map((post) => post.image);

  const navigate = useNavigate();

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // set Errors to ErrorMessage component via setErrors
  useEffect(() => {
    if (user?.error) {
      setErrors(user?.error);
    }
  }, [user]);

  // PERSIST DATA IN STATE UPON PAGE LOAD/PAGE REFRESH
  useEffect(() => {
    if (user?.data?.name) {
      setUserName(user?.data?.name);
    }
    if (user?.data?.email) {
      setUserEmail(user?.data?.email);
    }
    if (user?.data?.password) {
      setUserPassword(user?.data?.password);
    }
    if (user?.data?.confirmPassword) {
      setUserConfirmPassword(user?.data?.confirmPassword);
    }
  }, [user]);

  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !userEmail || !userPassword || !userConfirmPassword) {
      setErrors("Please fill in all fields");
      return;
    } else if (userPassword !== userConfirmPassword) {
      setErrors("Passwords do not match");
      return;
    }

    try {
      await updateUser({
        _id: user?.data?._id,
        name: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
      }).unwrap();
      navigate("/users/view");
    } catch (error) {
      setErrors(error.data?.message);

      console.error("ERROR", error.data?.message);
    }
  };

  const handleDeleteUserSubmit = async (e) => {
    e.preventDefault();

    // if user has posts, do not allow them to delete their account
    if (userPosts.length > 0) {
      setErrors("Cannot delete a user with posts");
      return;
    } else {
      setErrors("");
    }

    try {
      await deleteUser({
        id: user?.data?._id,
      }).unwrap();
      navigate("/users/view");

      // console.log(`User with id ${user?.data?._id} deleted`);
    } catch (error) {
      setErrors(error.data?.message);
      console.error("ERROR FROM DELETE", error.data?.message);
    }
  };

  // delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <section className="h-full">
      {isLoading && (
        <div className="pb-6 flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!isLoading || user ? (
        <div className="text-gray-800 w-full">
          <div className="flex flex-col items-center justify-center w-full">
            <div>
              <h1 className="font-inter font-bold text-4xl text-gray-700 w-full mb-6">
                Edit User
              </h1>
            </div>

            {errors && (
              <div className="-mt-[23px]">
                <ErrorMessage
                  variant={errors ? "danger" : "success"}
                  message={errors}
                />
              </div>
            )}

            <main className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
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

                {/* put dropdown userRoles here & use convertRoles to convert into usable data for the database */}
                {/* <div className="mb-6">
                  <label htmlFor="role">Role</label>
                  <select
                    className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    name="role"
                    id="role"
                    value={userRoles || ""}
                    onChange={(e) => setUserRoles(e.target.value)}
                  >
                    <option value="">Select a role</option>
                    {userRoles?.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div> */}

                {/* Edit Posts */}
                {/* <div className="mb-6">
                  <label htmlFor="posts">Posts</label>
                  <div className="flex flex-col">
                    {user?.data?.posts?.map((post) => (
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="posts"
                            // id={post?._id}
                            value={post?._id}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setUserPosts([...userPosts, e.target.value]);
                              } else {
                                setUserPosts(
                                  userPosts.filter(
                                    (post) => post !== e.target.value
                                  )
                                );
                              }
                            }}
                          />

                          <input
                            className="form-control block w-[450px] px-4 py-2 font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ml-3 text-[9px] italic"
                            type="text"
                            name="posts"
                            // id={post?._id}
                            placeholder={post?.prompt}
                            value={userPrompts}
                            autoComplete="off"
                            onChange={(e) => {
                              setUserPrompts(e.target.value);
                            }}
                          />
                        </div>
                        <img
                          src={post?.photo}
                          alt={post?.title}
                          className="w-10 h-10 rounded-md"
                        />
                      </div>
                    ))}
                  </div>
                </div> */}

                <div className="text-center lg:text-left">
                  {!isAdmin && (
                    <div className="text-red-600 font-medium text-sm leading-snug uppercase  focus:outline-none transition duration-200 ease-in-out w-full flex justify-center items-center mb-6">
                      Can only be deleted by an admin
                    </div>
                  )}

                  <button
                    className="-mt-1 mb-6 px-7 py-3 bg-[#6469] text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg hover:bg-[#b18eb199] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Update User
                  </button>

                  {isAdmin && !showDeleteModal && (
                    <button
                      className="px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                      type="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      data-mdb-toggle="modal"
                      data-mdb-target="#deleteUserModal"
                      onClick={handleDeleteModal}
                    >
                      Delete User
                    </button>
                  )}

                  {showDeleteModal && (
                    <div
                      className="modal fade"
                      id="deleteUserModal"
                      tabIndex="-1"
                      aria-labelledby="deleteUserModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered -mt-6">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="btn-close"
                              data-mdb-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            Are you sure you want to delete this user?
                          </div>
                          <div
                            className="modal-footer flex justify-evenly mt-4"
                            onClick={handleDeleteModal}
                          >
                            <button
                              type="button"
                              className="btn btn-secondary
                              px-7 py-3 bg-[#6469] text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out
                              "
                              data-mdb-dismiss="modal"
                            >
                              Cancel
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out"
                              data-mdb-dismiss="modal"
                              onClick={handleDeleteUserSubmit}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                  </div>
                </div>
              </form>

              <Link
                to={`/users/${user?.data?._id}`}
                className="px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Cancel
              </Link>
            </main>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default EditUser;
