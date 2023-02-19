import React from "react";

const UserSinglePost = ({ user }) => {
  const posts = user?.data?.posts;
  console.log("POSTS FROM SINGLE USER:", posts);

  console.log("Hello from UserSinglePost!");

  const userPost = posts?.map((post) => {
    return (
      <div key={post._id}>
        <div>{post.prompt}</div>
        <img src={post.photo} alt={post.prompt} />
      </div>
    );
  });

  return (
    <section className="h-full">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="px-6">
          <div className="flex flex-col items-center justify-center w-full">
            <div>
              <h1 className="font-inter font-bold text-4xl text-gray-700 w-full mb-6">
                Post
              </h1>
            </div>
          </div>
        </div>
        {userPost ? userPost : "No posts yet!"}
      </div>
    </section>
  );
};

export default UserSinglePost;
