import { useCreateUserMutation } from "../features/users/usersApiSlice";

import { useEffect, useState } from "react";

import ErrorMessage from "../hooks/useErrorMessage";
import { Loader } from "../components";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  // let userRole choose between user or admin
  // const [userRole, setUserRole] = useState(0);

  const navigate = useNavigate();

  const [createUser, { isLoading }] = useCreateUserMutation();

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // useHeaderButton title & link
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "See Users";
    button.href = "/users/view";
  }, []);

  const createUserSubmit = async (e) => {
    e.preventDefault();

    if (userPassword !== userConfirmPassword) {
      setErrors("Passwords do not match");
      return;
    }

    try {
      const userData = await createUser({
        name: userName,
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
        // role: userRole,
      })
        .unwrap()
        .then((data) => {
          // console.log("REGISTER REDUX DATA", data);
          return data;
        });

      setUserName("");
      setUserEmail("");
      setUserPassword("");
      setUserConfirmPassword("");
      // // setUserRole to the value of the dropdown menu
      // setUserRole(userRole);

      // // assign user role to 0 if userRole is not 1
      // if (userRole !== 1) {
      //   setUserRole(0);
      // } else {
      //   setUserRole(1);
      // }

      // console.log("ROLE", userRole);

      // console.log("USER ID", userData?.data?._id);
      navigate(`/users/${userData?.data?._id}`);
    } catch (error) {
      setErrors(error.data?.message);
      console.error("ERROR", error.data?.message);
    }
  };

  return (
    <section className="h-full w-full">
      <div className="px-6 text-gray-800">
        <div className="flex flex-col items-center justify-center w-full">
          <div>
            {isLoading && (
              <div className="pb-6 flex justify-center items-center">
                <Loader />
              </div>
            )}

            <h1 className="font-inter font-extrabold text-4xl text-[#222328] w-full mb-6">
              Register
            </h1>
          </div>

          {errors && (
            <div className="-mt-[30px]">
              <ErrorMessage
                variant={errors ? "danger" : "success"}
                message={errors}
              />
            </div>
          )}

          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={createUserSubmit}>
              <div className="mb-6">
                <input
                  className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  autoComplete="off"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email address"
                  autoComplete="off"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="off"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  autoComplete="off"
                  onChange={(e) => setUserConfirmPassword(e.target.value)}
                />
              </div>

              {/* let user choose between user (which equals 0) or admin (which equals 1) */}
              {/* <div className="mb-6">
                <select
                  className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  name="role"
                  id="role"
                  onChange={(e) => setUserRole(e.target.value)}
                >
                  <option value="0">User</option>
                  <option value="1">Admin</option>
                </select>
              </div> */}

              <div className="text-center lg:text-left">
                <button
                  className="px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                  type="submit"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign Up
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <a
                  className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md bg-[#ea4335] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 
                  ease-in-out w-full flex justify-center items-center mb-3"
                  href="http://localhost:8000/auth/google"
                  role="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <svg
                    xmlns="https://www.w3.org/2000/svg"
                    viewBox="0 0 488 512"
                    className="w-3.5 h-3.5 mr-2"
                  >
                    <path
                      fill="currentColor"
                      d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                    />
                  </svg>
                  Sign up with Google
                </a>

                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Already have an account? &nbsp;
                  <a
                    href="/login"
                    className="text-[#6469ff] hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out hover:underline cursor-pointer"
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
