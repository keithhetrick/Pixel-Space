import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [userId, setUserId] = useState(id);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  const formatterDateAndTime = (date) => {
    const newDate = new Date(date);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",

      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return newDate.toLocaleDateString("en-US", options);
  };

  const formattedCreatedAt = formatterDateAndTime(userData?.createdAt);
  const formattedUpdatedAt = formatterDateAndTime(userData?.updatedAt);

  const showUpdatedAt = formattedCreatedAt !== formattedUpdatedAt;

  const fetchSingleUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setUserData(result?.data);
        setUserId(result?.data._id);
        setUserEmail(result?.data.email);
        setUserName(result?.data.name);
        setUserPassword(result?.data.password);
        setUserConfirmPassword(result?.data.confirmPassword);
        setUserPosts(result?.data.posts);
        console.log("RESULT:", result?.data);
      }
    } catch (err) {
      setErrors(err);
      console.log("ERROR:", err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Edit User</h1>
      <button
        className="font-inter font-medium bg-[#6469] mt-1 text-white px-4 py-2 rounded-md hover:bg-[#b18eb199] hover:translate-y-[-1px] transition duration-200"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" value={userName} />

          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" value={userEmail} />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={userPassword}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={userConfirmPassword}
          />

          <button type="submit">Update</button>

          <button type="button">Delete</button>

          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
