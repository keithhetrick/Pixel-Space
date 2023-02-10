import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // useHeaderButton title & link
  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Home";
    button.href = "/";
  }, []);

  const fetchAllUsersUrl = `https://localhost:8000/api/user`;

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(fetchAllUsersUrl, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const result = response.data;
        setUsers(result?.data);
        console.log("RESULT:", result?.data);
      }
    } catch (err) {
      console.log("ERROR:", err);
      alert(err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="font-bold text-[#222328] text-[24px] mb-2">View Users</h1>
      {/* when user is clicked, take is to specific users ID page */}
      <div>
        {users.length === 0 || !users ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user._id}
              className="border-2 border-gray-300 rounded-md p-4 mb-4
              hover:shadow-lg hover:translate-y-[-1px] transition duration-200 cursor-pointer"
              onClick={() => navigate(`/user/${user._id}`)}
            >
              <h2 className="font-bold text-[#222328] text-[18px] mr-1">
                {user.name}
              </h2>
              <p>{user.email}</p>

              {/* if no post, show No Posts */}
              <div>
                {user.posts.length === 0 || !user.posts ? (
                  <p className="text-[#222328] italic text-[14px] mr-1">
                    No Posts
                  </p>
                ) : (
                  user.posts.map((post) => (
                    <div key={post._id}>
                      <p>{post.title}</p>
                      <p>{post.body}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewUsers;
