import { useParams } from "react-router-dom";
import { useState } from "react";
import UsersAllPosts from "./UsersAllPosts";
import UserSinglePost from "./UserSinglePost";
import { useGetSingleUserQuery } from "../../features/users/usersApiSlice";

import { Loader } from "../../components";

const UserPostsWrapper = () => {
  const { id } = useParams();
  const [singleimageId, setSingleImageId] = useState(null);

  const { data: user } = useGetSingleUserQuery(id);

  const passImageIdToUserSinglePost = (imageId) => {
    console.log("setSingleImageId from UserPostsWrapper:", imageId);
    setSingleImageId(imageId);
  };

  console.log("singleimageId from UserPostsWrapper:", singleimageId);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (singleimageId) {
  //     navigate(`/user/${id}/posts/${singleimageId}`);
  //     console.log("URL:", window.location.href);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [singleimageId]);

  return (
    <>
      {user ? (
        <>
          {singleimageId ? (
            <UserSinglePost
              user={user}
              imageId={singleimageId}
              passImageIdToUserSinglePost={passImageIdToUserSinglePost}
            />
          ) : (
            <UsersAllPosts
              user={user}
              passImageId={passImageIdToUserSinglePost}
            />
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserPostsWrapper;
