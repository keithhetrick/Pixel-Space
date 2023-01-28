import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Image = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const getUrlByID = `http://localhost:8000/api/post/${id}`;

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const fetchImage = async () => {
    setLoading(true);

    try {
      const response = await fetch(getUrlByID, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setImage(result.data);
      } else {
        navigate("/404");
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <img src={image.photo} alt={image.prompt} />
      )}
    </div>
  );
};

export default Image;
