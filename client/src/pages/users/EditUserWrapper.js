import { useParams } from "react-router-dom";
import EditUser from "./EditUser";
import { useGetSingleUserQuery } from "../../features/users/usersApiSlice";

import React from "react";

const EditUserWrapper = () => {
  const { id } = useParams();

  const { data } = useGetSingleUserQuery(id);

  console.log("EDIT PAGE WRAPPER REDUX DATA", data);

  if (!data?.data) {
    return <div>Loading...</div>;
  } else {
    return <EditUser data={data} />;
  }
};

export default EditUserWrapper;
