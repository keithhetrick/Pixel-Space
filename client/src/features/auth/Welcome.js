import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);

  console.log("USER: ", user?.data?.name);

  const welcome = user ? `Welcome ${user}` : "Welcome Guest";

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>

      <p>
        <Link to="/users/list">Go to the Users List</Link>
      </p>
    </section>
  );

  return content;
};
export default Welcome;
