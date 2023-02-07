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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
          confirmPassword: userConfirmPassword,
        }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("RESULT:", result);
        navigate(`/user/${userId}`);
      }
    } catch (err) {
      setErrors(err);
      console.log("ERROR:", err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

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

      {errors && <p className="text-red-500">{errors.message}</p>}
      {loading && <p>Loading...</p>}
      {!loading && !errors && userData && (
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={userConfirmPassword}
              onChange={(e) => setUserConfirmPassword(e.target.value)}
            />

            <button
              className="font-inter font-medium bg-[#6469] mt-1 text-white px-4 py-2 rounded-md hover:bg-[#b18eb199] hover:translate-y-[-1px] transition duration-200"
              type="submit"
            >
              Update User
            </button>

            {/* <button
              className="font-inter font-medium bg-[#6469] mt-1 text-white px-4 py-2 rounded-md hover:bg-[#b18eb199] hover:translate-y-[-1px] transition duration-200"
              onClick={() => navigate(`/user/${userId}`)}
            >
              Cancel
            </button> */}

            {/* <button
              className="font-inter font-medium bg-[#6469] mt-1 text-white px-4 py-2 rounded-md hover:bg-[#b18eb199] hover:translate-y-[-1px] transition duration-200"
              onClick={() => navigate(`/user/${userId}/delete`)}
            >
              Delete User
            </button> */}
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;
