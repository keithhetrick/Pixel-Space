import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Loader } from "../../components";

const UsersPosts = ({ user }) => {
  const [
    loading,
    // eslint-disable-next-line no-unused-vars
    setLoading,
  ] = useState(false);

  const _id = user?.data?._id;

  const navigate = useNavigate();

  console.log("user:", user);

  const posts = user?.data?.posts;
  console.log("posts:", posts);

  // send user to clicked post
  const handlePostClick = (id) => {
    console.log("id:", id);
    console.log("user Id:", _id);
    navigate(`/users/${_id}/posts/${id}`);
  };

  const postsList = posts?.map((post) => {
    return (
      <div key={post._id}>
        <div>{post.prompt}</div>

        <img
          src={post.photo}
          alt={post.prompt}
          className="w-full h-64 object-cover"
          onClick={() => handlePostClick(post._id)}
        />
      </div>
    );
  });

  return (
    <section className="h-full">
      {loading && (
        <div className="pb-6 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <div className="px-6 text-gray-800">
        <div className="flex flex-col items-center justify-center w-full">
          <div>
            <h1 className="font-inter font-bold text-4xl text-gray-700 w-full mb-6">
              {user?.data?.name}'s Posts
            </h1>
          </div>
        </div>
      </div>
      {postsList}{" "}
      {/* <section className="h-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="px-6">
            <div
              className="flex flex-col items-center justify-center w-full
            "
            >
              {loading && (
                <div className="pb-6 flex justify-center items-center">
                  <Loader />
                </div>
              )}

              <div
                className="flex flex-col justify-center items-center w-full h-full"
                onKeyDown={handleKeyDown}
                {...handlers}
              >
                <div className="flex justify-center items-center w-full h-full">
                  <div className="absolute left-0 z-10 flex justify-center items-center h-full">
                    <button
                      className="w-8 h-8 text-gray rounded-full opacity-75 hover:translate-y-[-3px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-200 ease-in-out"
                      onClick={next}
                    >
                      <svg
                        className="w-6 h-6 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="absolute right-0 z-10 flex justify-center items-center h-full">
                    <button
                      className="w-8 h-8 text-white-900 rounded-full opacity-75 hover:translate-y-[-3px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-200 ease-in-out"
                      onClick={prev}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <img
                    className="rounded-xl w-full h-full object-cover"
                    src={image?.photo}
                    alt={image?.name}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between text-center items-center w-full h-auto mt-6">
                <span className="text-[#000000e2] text-md font-bold">
                  {image?.name}
                </span>{" "}
                <p className="text-black text-sm xs:text-xs mx-2 my-3">
                  {" "}
                  <span className="text-[#1d161ddd] italic font-light flex-wrap">
                    {image?.prompt}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={() => downloadImage(image?._id, image?.photo)}
                  className="outline-none bg-transparent border-none"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="download"
                    className="w-6 mx-auto hover:animate-bounce text-gray-700"
                    role="img"
                    xmlns="https://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </section>
  );
};

export default UsersPosts;
