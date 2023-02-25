import { Outlet } from "react-router-dom";

import // useGetUsersQuery,
// useGetSingleUserQuery,
"../features/users/usersApiSlice";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  // const { data: allUsers } = useGetUsersQuery({});

  // console.log("APP - users: ", allUsers);
  // console.log("APP - users?.data?.id: ", allUsers?.data?.id);

  // const { data: singleUser } = useGetSingleUserQuery({});

  // console.log("APP - user: ", singleUser);
  // console.log("APP - user?.data?.id: ", singleUser?.data?.id);

  return (
    <>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(91vh-73px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
