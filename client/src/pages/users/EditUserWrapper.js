import { useParams } from "react-router-dom";
import EditUser from "./EditUser";
import { useGetSingleUserQuery } from "../../features/users/usersApiSlice";
import { Loader } from "../../components";

import React from "react";

const EditUserWrapper = () => {
  const { id } = useParams();

  const { data: user } = useGetSingleUserQuery(id);

  return <>{user ? <EditUser user={user} /> : <Loader />}</>;
};

export default EditUserWrapper;
