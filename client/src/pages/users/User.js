import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [userId, setUserId] = useState(id);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
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

  const fetchSingleUserUrl = `http://localhost:8000/api/user/${userId}`;

  const fetchSingleUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(fetchSingleUserUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const result = response.data;
        setUserData(result?.data);
        setUserId(result?.data._id);
        setUserEmail(result?.data.email);
        setUserName(result?.data.name);
        setUserPassword(result?.data.password);
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
      <button
        className="font-inter font-medium bg-[#6469] mt-1 text-white px-4 py-2 rounded-md hover:bg-[#b18eb199] hover:translate-y-[-1px] transition duration-200"
        onClick={() => navigate(`/`)}
      >
        Back
      </button>
      <h1 className="font-extrabold text-[#222328] text-[25px]">
        <div>Details for {userName}</div>
      </h1>
      {loading ? <p>Loading...</p> : null}
      {errors ? <p>{errors}</p> : null}
      <section className="max-w-7xl mx-auto">
        <div>
          {userData ? (
            <div>
              <div>
                <span className="font-bold text-[#222328] text-[18px] mr-1">
                  User:
                </span>
                {userName}
              </div>
              <div>
                <span className="font-bold text-[#222328] text-[18px] mr-1">
                  Email:
                </span>
                {userEmail}
              </div>
              <div>
                <span className="font-bold text-[#222328] text-[18px] mr-1">
                  Password:
                </span>
                <span
                  className="text-[#222328] text-[18px] mr-1"
                  style={{ filter: "blur(8px)" }}
                >
                  {userPassword}
                </span>
              </div>
              <div>
                <span className="font-bold text-[#222328] text-[18px] mr-1">
                  ID:
                </span>
                {userId}
              </div>
              <div>
                <span className="font-bold text-[#222328] text-[18px] mr-1">
                  Created At:
                </span>
                {formattedCreatedAt}
              </div>
              {showUpdatedAt ? (
                <div>
                  <span className="font-bold text-[#222328] text-[18px] mr-1">
                    Last update:
                  </span>
                  {formattedUpdatedAt}
                </div>
              ) : null}
              <div>
                <div>
                  <span className="font-bold text-[#222328] text-[18px] mr-1">
                    Posts:
                  </span>
                  {userPosts.length}
                </div>
                {userPosts.map((post) => (
                  <div key={post._id}>
                    <div>{post.name}</div>
                    <div>{post.prompt}</div>
                    <div>{post._id}</div>
                    <div>{post.createdAt}</div>
                    <div>{post.updatedAt}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <div className="flex justify-center items-center">
        <button
          className="font-inter font-medium bg-[#6469] mt-1 text-white px-4 py-2 rounded-md hover:bg-[#b18eb199] hover:translate-y-[-1px] transition duration-200"
          onClick={() => navigate(`/user/${userId}/edit`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default User;
