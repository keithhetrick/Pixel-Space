import { useParams } from "react-router-dom";
import UsersAllPosts from "./UsersAllPosts";
import UserSinglePost from "./UserSinglePost";
import { useGetSingleUserQuery } from "../../features/users/usersApiSlice";
import { Loader } from "../../components";
import { useState } from "react";

const UserPostsWrapper = () => {
  const { id } = useParams();
  const [singleimageId, setSingleImageId] = useState(null);

  const { data: user } = useGetSingleUserQuery(id);

  const passImageIdToUserSinglePost = (imageId) => {
    console.log("imageId:", imageId);
    setSingleImageId(imageId);
  };

  console.log("singleimageId:", singleimageId);

  return (
    <>
      {/* if user clicks on a specfic image, use "UserSinglePost", otherwise use "UserAllPosts" - send imageId data from UsersAllPosts to UserSinglePost for navigation */}
      {user ? (
        <>
          {user.post ? (
            <UserSinglePost user={user} imageId={singleimageId} />
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
