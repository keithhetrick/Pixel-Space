import { useGetSingleUserQuery } from "../../features/users/usersApiSlice";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ErrorMessage from "../../hooks/useErrorMessage";

import { Loader } from "../../components";

const User = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleUserQuery(id);

  console.log("DATA", data);
  console.log("USER ID", id);

  const navigate = useNavigate();

  // const [loading, setLoading] = useState(false);
  // const [userId, setUserId] = useState(id);
  // const [userEmail, setUserEmail] = useState("");
  // const [userName, setUserName] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  // const [userPosts, setUserPosts] = useState([]);

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // set Errors to ErrorMessage component via setErrors
  useEffect(() => {
    if (data?.error) {
      setErrors(data?.error);
    }
  }, [data]);

  // useHeaderButton title & link
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Create";
    button.href = "/create-post";
  }, []);

  const formatterDateAndTime = (date) => {
    const newDate = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  const formattedCreatedAt = formatterDateAndTime(data?.data?.createdAt);
  const formattedUpdatedAt = formatterDateAndTime(data?.data?.updatedAt);

  const showUpdatedAt = formattedCreatedAt !== formattedUpdatedAt;

  // const fetchSingleUserUrl = `http://localhost:8000/api/users/${userId}`;

  // const fetchSingleUser = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await axios.get(fetchSingleUserUrl, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (response.status === 200) {
  //       const result = response.data;
  //       setUserData(result?.data);
  //       setUserId(result?.data._id);
  //       setUserEmail(result?.data.email);
  //       setUserName(result?.data.name);
  //       setUserPassword(result?.data.password);
  //       setUserPosts(result?.data.posts);
  //       console.log("RESULT:", result?.data);
  //     }
  //   } catch (error) {
  //     setErrors(error);
  //     console.log("ERROR:", error);
  //     alert(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchSingleUser();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
              <h1 className="font-inter font-extrabold text-4xl text-[#222328] w-full mb-6">
                Details for{" "}
                <span className="italic text-gray-400">{data.data?.name}</span>
              </h1>
            </div>

            {errors && (
              <ErrorMessage
                variant={errors ? "danger" : "success"}
                message={errors}
              />
            )}

            <main className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              {data ? (
                <div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-lg">
                      User: &nbsp;
                    </span>
                    {data.data?.name}
                  </div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-lg">
                      Email: &nbsp;
                    </span>
                    {data.data?.email}
                  </div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-lg">
                      Password: &nbsp;
                    </span>
                    <span className="font-normal text-base blur-sm hover:blur-none cursor-pointer transition duration-150">
                      {data.data?.password}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-[#222328] text-lg">
                      ID: &nbsp;
                    </span>
                    {data.data?._id}
                  </div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-lg">
                      Created At: &nbsp;
                    </span>
                    {formattedCreatedAt}
                  </div>
                  {showUpdatedAt ? (
                    <div className="mb-1">
                      <span className="font-bold text-[#222328] text-lg">
                        Updated At: &nbsp;
                      </span>
                      {formattedUpdatedAt}
                    </div>
                  ) : null}
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-lg">
                      Posts: &nbsp;
                    </span>
                    {data.data?.posts?.length}
                  </div>

                  <div className="flex flex-col items-center justify-center w-full">
                    {data.data?.posts?.length > 0
                      ? data.data?.posts?.map((post) => (
                          <div
                            key={post._id}
                            className="flex flex-col items-center justify-center w-full"
                          >
                            <div>{post?.name}</div>
                            <div>{post?.prompt}</div>
                            <div>{post?._id}</div>
                            <div>{post?.createdAt}</div>
                            <div>{post?.updatedAt}</div>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col items-center justify-center w-full h-full">
                <Link
                  to={`/users/${data.data?._id}/edit`}
                  className="mb-6 px-7 py-3 bg-gray-400 rounded-md shadow-md hover:shadow-lg hover:bg-gray-500 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-2000 ease-in-out w-full flex justify-center items-center mb-3l"
                >
                  <button className=" text-white font-medium text-sm leading-snug uppercase">
                    Edit {data.data?.name}
                  </button>
                </Link>
                <Link
                  to="/users/view"
                  className="mb-6 px-7 py-3 bg-gray-400 rounded-md shadow-md hover:bg-gray-500 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                >
                  <button
                    className="text-white font-medium text-sm leading-snug uppercase"
                    type="submit"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Back
                  </button>
                </Link>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="font-inter font-bold text-4xl text-gray-700 w-full mb-6">
            No User Found
          </h1>
          <button
            className="px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-2000 ease-in-out w-full flex justify-center items-center mb-3l"
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

export default User;
