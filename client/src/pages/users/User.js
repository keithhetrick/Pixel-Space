import { useGetSingleUserQuery } from "../../features/users/usersApiSlice";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ErrorMessage from "../../hooks/useErrorMessage";

import { Loader } from "../../components";

const User = () => {
  const { id } = useParams();
  const { data, isLoading, refetch } = useGetSingleUserQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  console.log("USER PAGE REDUX DATA", data);
  // console.log("USER PAGE REDUX DATA - USER ID:", id);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const navigate = useNavigate();

  // handleImageClick function takes takes user to the Image page of the clicked image based on the image ID
  const handleImageClick = (data) => {
    // map through all posts inside the data object
    const imageID = data?.data?.posts?.map((post) => {
      // return the index of the clicked image
      return post._id;
    });
    console.log("IMAGE ID: ", imageID);

    // navigate to the Image page of the clicked image
    navigate(`/image/${imageID[0]}`);
  };

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
                  {/* <div className="mb-1">
                    <span className="font-bold text-[#222328] text-lg">
                      Password: &nbsp;
                    </span>
                    <span className="font-normal text-base blur-sm hover:blur-none cursor-pointer transition duration-150">
                      {data.data?.password}
                    </span>
                  </div> */}
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

                  <div className="flex flex-col gap-3 my-3 items-center justify-center w-full">
                    {data.data?.posts?.length > 0
                      ? data.data?.posts?.map((post) => (
                          <div
                            key={post._id}
                            className="rounded-xl group p-4 flex flex-col items-center justify-center relative w-5/6 shadow-card hover:translate-y-[-1px] hover:shadow-cardhover card transition duration-200 cursor-pointer
                            border border-[#222328] border-opacity-10 gap-3
                            "
                            onClick={() => handleImageClick(data)}
                          >
                            <div className="text-[#222328] text-normal text-center">
                              {post?.prompt}
                            </div>
                            <div className="text-[#222328] text-[10px] italic">
                              {formatterDateAndTime(post?.createdAt)}
                            </div>
                            <img
                              className="rounded-xl w-5/6 h-1/2 object-cover transition duration-200 cursor-pointer mb-6
                              
                              "
                              src={post?.photo}
                              alt={post?.prompt}
                            ></img>
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
