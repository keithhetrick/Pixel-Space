import { useGetUsersQuery } from "./usersApiSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();

  console.log("USERS: ", users); // destructured users object
  console.log("USERS DATA: ", users?.data); // destructured users object

  const content = (
    <section className="userslist">
      <h1>Users List</h1>
      <p>
        <Link to="/">Go to the Welcome Page</Link>
      </p>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <ul>
          {users?.data?.map((user, i) => (
            <li key={i}>
              <Link to={`/users/${user._id}`}>
                {user._id}: {user.name} - {user.email}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {isError && <p>{error}</p>}
    </section>
  );

  return content;
};
export default UsersList;
