import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const User = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState("");
  const [userId, setUserId] = useState(id);

  const fetchUser = async () => {
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
        setUser(result?.data);
        setUserId(result?.data._id);
      }
    } catch (err) {
      setErrors(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1 className="font-extrabold text-[#222328] text-[25px]">
        <div>Users Page</div>
        {loading ? <p>Loading...</p> : null}
        {user ? <p>{user?.name}</p> : null}
        {errors ? <p>{errors}</p> : null}
        {userId ? <p>{userId}</p> : null}
      </h1>
    </div>
  );
};

export default User;
