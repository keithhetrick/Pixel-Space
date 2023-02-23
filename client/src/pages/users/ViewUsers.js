import { useGetUsersQuery } from "../../features/users/usersApiSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import ErrorMessage from "../../hooks/useErrorMessage";
import { Loader } from "../../components";

const ViewUsers = () => {
  const { data: users, isLoading, isSuccess } = useGetUsersQuery({});

  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (users?.data?.roles?.includes(1)) {
      setIsAdmin(true);
    }
  }, [users]);

  // console.log("isAdmin: ", isAdmin);

  // ERRORS VALIDATION
  const [errors, setErrors] = useState("");

  // set errors to ErrorMessage component via setErrors
  useEffect(() => {
    if (users?.error) {
      setErrors(users?.error);
    }
  }, [users]);

  // useHeaderButton title & link, use Link from react-router-dom to link to home page
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Create";
    button.href = "/create-post";

    return () => {
      button.innerHTML = "";
      button.href = "";
    };
  }, []);

  return (
    <section className="userslist">
      <h1 className="font-inter font-extrabold text-4xl text-[#222328] w-full mb-6">
        View Users
      </h1>

      {isLoading && (
        <div className="pb-6 flex justify-center items-center">
          <Loader />
        </div>
      )}

      {errors && (
        <div className="-mt-[30px]">
          <ErrorMessage
            variant={errors ? "danger" : "success"}
            message={errors}
          />
        </div>
      )}

      {isSuccess && (
        <ul>
          {users?.data?.map((user, i) => (
            <li
              key={i}
              className="border-2 border-gray-300 rounded-md p-4 mb-4
              hover:shadow-lg hover:translate-y-[-1px] transition duration-200 cursor-pointer"
            >
              <Link to={`/users/${user._id}`}>
                <h2 className="font-bold text-[#222328] text-[18px] mr-1">
                  {user.name}
                </h2>
                <p>{user.email}</p>
                {/* if an admin, show "Admin" - else leave blank */}
                {user.roles.includes(1) ? (
                  <p className="text-[#ff4e4e] italic text-[14px] mr-1">
                    Admin
                  </p>
                ) : null}

                <div>
                  {user.posts.length === 0 || !user.posts ? (
                    <p className="text-[#222328] italic text-[14px] mr-1">
                      No Posts
                    </p>
                  ) : (
                    <p className="text-[#222328] italic text-[14px] mr-1">
                      {user.posts.length === 1
                        ? `${user.posts.length} Post`
                        : `${user.posts.length} Posts`}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ViewUsers;
