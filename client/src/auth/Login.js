import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ErrorMessage from "../hooks/useErrorMessage";
import { Loader } from "../components";
import { pixelspace } from "../assets";

import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";

const Login = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // console.log("ERRORS", errors);

  // useHeaderButton title & link
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Sign out";
    button.href = "http://localhost:8000/auth/logout";
  }, []);

  const loginUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ email: userEmail, password: userPassword })
        .unwrap()
        .then((data) => {
          console.log("DATA", data);
          return data;
        });

      dispatch(setCredentials(userData));

      setUserEmail("");
      setUserPassword("");
      navigate(`/users/${userData?.data?._id}`);
      console.log(
        "NAVIGATE TO USER",
        navigate(`/users/${userData?.data?._id}`)
      );
    } catch (error) {
      setErrors(error.data?.message);
      console.log("ERROR", error.data?.message);
    }
  };
  console.log("ERRORS STATE", errors);
  console.log("MESSAGE VARIANT", errors ? "danger" : "success");

  return (
    <section className="h-full">
      <div className="px-6 text-gray-800">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col items-center justify-center w-full mb-6">
            {isLoading && (
              <div className="pb-6 flex justify-center items-center">
                <Loader />
              </div>
            )}
            <h1 className="font-extrabold text-5xl mb-6 text-gray-800 pixel__space__text">
              Pixel Space
            </h1>
            <img
              src={pixelspace}
              alt="Pixel Space"
              className="w-20 h-20 rounded-full border-2 border-gray-200 animate-pulse hover:border-none hover:shadow-lg hover:rounded-none hover:animate-bounce ease-in-out transition duration-500 cursor-pointer
              "
            />
          </div>

          {errors && (
            <div className="-mt-[23px]">
              <ErrorMessage
                variant={errors ? "danger" : "success"}
                message={errors}
              />
            </div>
          )}

          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={loginUserSubmit}>
              <div className="mb-6">
                <input
                  className="form-control block w-full px-4 py-2 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Email address"
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

              <div className="flex justify-between items-center mb-6 max-[776px]:flex-col max-[776px]:gap-2">
                <div className="form-group form-check">
                  <input
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-md bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    name="remember-checkbox"
                    id="remember-checkbox"
                    autoComplete="off"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800 text-sm leading-snug cursor-pointer"
                    htmlFor="remember-checkbox"
                  >
                    Remember me
                  </label>
                </div>
                <a
                  href="#!"
                  className="text-gray-800
                hover:text-blue-600 text-sm leading-snug
                "
                >
                  Forgot password?
                </a>
              </div>

              <div className="text-center lg:text-left">
                <button
                  className="px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:bg-blue-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                  type="submit"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>

                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>

                <a
                  className="px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md bg-[#ea4335] hover:bg-[#ef7166] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 
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
                  Continue with Google
                </a>

                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account? &nbsp;
                  <a
                    href="/register"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Register
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

export default Login;
