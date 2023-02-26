import { Outlet } from "react-router-dom";

import // useGetUsersQuery,
// useGetSingleUserQuery,
"../features/users/usersApiSlice";

import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  // const { data: allUsers } = useGetUsersQuery({});

  // console.log("LAYOUT - users: ", allUsers);
  // console.log("LAYOUT - users?.data?.id: ", allUsers?.data?.id);

  // const { data: singleUser } = useGetSingleUserQuery({});

  // console.log("LAYOUT - user: ", singleUser);
  // console.log("LAYOUT - user?.data?.id: ", singleUser?.data?.id);

  return (
    <>
      <Header />
      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(91vh-73px)] flex flex-1 relative justify-center">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
