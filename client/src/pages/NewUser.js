import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  // make a new user with a POST request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/user`, {
        method: "POST",
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
        navigate(`/user/${result?.data._id}`);
      }
    } catch (err) {
      setErrors(err);
      console.log("ERROR:", err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>New User</h1>
      {loading && <p>Loading...</p>}
      {errors && <p>{errors}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewUser;
