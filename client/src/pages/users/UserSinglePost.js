import { useNavigate } from "react-router-dom";

const UserSinglePost = ({ user, imageId }) => {
  const navigate = useNavigate();

  const userId = user?.data?._id;

  const getAllPosts = user?.data?.posts;

  // create a function that goes to the prev post in the users posts array
  const prevPost = () => {
    // get the index of the current post
    const index = getAllPosts.findIndex((post) => post._id === imageId);
    // console.log("index from prevPost:", index);
    // get the prev post
    const prevPost = getAllPosts[index - 1];
    // console.log("prevPost from prevPost:", prevPost);

    // if there is no prev post, dont do anything
    if (!prevPost) return;

    // take the user to the prev post
    navigate(`/user/${userId}/posts/${prevPost._id}`);
  };

  // create a function that goes to the next post in the users posts array
  const nextPost = () => {
    // get the index of the current post
    const index = getAllPosts.findIndex((post) => post._id === imageId);
    // console.log("index from nextPost:", index);
    // get the next post
    const nextPost = getAllPosts[index + 1];
    // console.log("nextPost from nextPost:", nextPost);

    // if there is no next post, dont do anything
    if (!nextPost) return;

    // take the user to the next post
    navigate(`/user/${userId}/posts/${nextPost._id}`);
  };

  const onHandleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      prevPost();
    } else if (e.key === "ArrowRight") {
      nextPost();
    }
  };

  const post = user?.data?.posts?.filter((post) => post._id === imageId)[0];

  // console.log("post from UserSinglePost:", post);

  return (
    <section className="h-full">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="px-6">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex justify-between w-full">
                <div className="flex items-center justify-center w-1/2">
                  <button
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    onClick={prevPost}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-center w-1/2">
                  <button
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                    onClick={nextPost}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h1
                  className="font-inter font-bold text-4xl text-gray-700 w-full mb-6"
                  onKeyDown={onHandleKeyDown}
                >
                  {post?.prompt}
                </h1>

                <img
                  src={post?.photo}
                  alt={post?.prompt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSinglePost;
