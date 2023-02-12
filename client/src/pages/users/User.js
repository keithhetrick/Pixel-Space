import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ErrorMessage from "../../hooks/useErrorMessage";

import axios from "axios";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(id);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

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

  const formattedCreatedAt = formatterDateAndTime(userData?.createdAt);
  const formattedUpdatedAt = formatterDateAndTime(userData?.updatedAt);

  const showUpdatedAt = formattedCreatedAt !== formattedUpdatedAt;

  const fetchSingleUserUrl = `http://localhost:8000/api/user/${userId}`;

  const fetchSingleUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(fetchSingleUserUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const result = response.data;
        setUserData(result?.data);
        setUserId(result?.data._id);
        setUserEmail(result?.data.email);
        setUserName(result?.data.name);
        setUserPassword(result?.data.password);
        setUserPosts(result?.data.posts);
        console.log("RESULT:", result?.data);
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

  return (
    <section className="h-full">
      {userData ? (
        <div className="px-6 text-gray-800">
          <div className="flex flex-col items-center justify-center w-full">
            {/* <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <button
                className="mb-6 mt-1 px-7 py-3 bg-[#6469] text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg hover:translate-y-[-1px] hover:bg-[#b18eb199] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                type="submit"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div> */}
            <div>
              {loading && <p>Loading...</p>}

              <h1 className="font-inter font-bold text-4xl text-gray-700 w-full mb-6">
                Details for{" "}
                <span className="italic text-[#6469]">{userName}</span>
              </h1>
            </div>

            {errors && (
              <ErrorMessage
                variant={errors ? "danger" : "success"}
                message={errors}
              />
            )}

            <main className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              {userData ? (
                <div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-[18px]">
                      User: &nbsp;
                    </span>
                    {userName}
                  </div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-[18px]">
                      Email: &nbsp;
                    </span>
                    {userEmail}
                  </div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-[18px]">
                      Password: &nbsp;
                    </span>
                    <span
                      className="text-[#222328] text-[18px] blur-sm hover:blur-none cursor-pointer transition duration-150"
                      type="password"
                    >
                      {userPassword}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-[18px]">
                      ID: &nbsp;
                    </span>
                    {userId}
                  </div>
                  <div className="mb-1">
                    <span className="font-bold text-[#222328] text-[18px]">
                      Created At: &nbsp;
                    </span>
                    {formattedCreatedAt}
                  </div>
                  {showUpdatedAt ? (
                    <div>
                      <span className="font-bold text-[#222328] text-[18px]">
                        Last update: &nbsp;
                      </span>
                      {formattedUpdatedAt}
                    </div>
                  ) : null}
                  <div>
                    <div>
                      <span className="font-bold text-[#222328] text-[18px]">
                        Posts: &nbsp;
                      </span>
                      {userPosts.length}
                    </div>
                    {userPosts.map((post) => (
                      <div
                        key={post?._id}
                        className="flex flex-col items-center justify-center w-full h-full"
                      >
                        <div>{post?.name}</div>
                        <div>{post?.prompt}</div>
                        <div>{post?._id}</div>
                        <div>{post?.createdAt}</div>
                        <div>{post?.updatedAt}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="flex flex-col items-center justify-center w-full h-full">
                <button
                  className="mb-6 mt-1 px-7 py-3 bg-[#6469] text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg hover:translate-y-[-1px] hover:bg-[#b18eb199] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out w-full flex justify-center items-center mb-3l"
                  type="submit"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  onClick={() => navigate(`/user/${userId}/edit`)}
                >
                  Edit {userName}
                </button>
              </div>
            </main>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h1 className="font-inter font-bold text-4xl text-gray-700 w-full mb-6">
            No User
          </h1>
          <button
            className="px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-2000 ease-in-out w-full flex justify-center items-center mb-3l"
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

export default User;
