// import { useSelector } from "react-redux";
// import { setPosts } from "./postSlice";

// import postsApi from "./api/postsApi";

import { useGetPostsQuery } from "../../pages/posts/postsApiSlice";

const GetPosts = () => {
  const { data: postsData } = useGetPostsQuery();

  console.log("postsData: ", postsData);

  const posts = postsData?.data;

  console.log("posts: ", posts);

  const postList = posts?.map((post) => (
    <div key={post._id}>
      <img
        src={post.photo}
        alt={post.prompt}
        style={{ width: "100px", height: "100px" }}
      />
      <p>
        {post.name} - {post.prompt}
      </p>
    </div>
  ));

  // const fetchPosts = async () => {
  //   try {
  //     const response = await postsApi.get("/");
  //     console.log("response: ", response);
  //   } catch (err) {
  //     console.log("err: ", err);
  //   }
  // };

  // fetchPosts();

  // const posts = useSelector(setPosts);

  // console.log("posts: ", posts);

  return (
    <div>
      <h1>Get Posts</h1>

      {postList}
    </div>
  );
};

export default GetPosts;
