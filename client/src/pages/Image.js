import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { download } from "../assets";
import { downloadImage } from "../utils";

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
        <div className="flex flex-col items-center justify-center w-full h-full">
          <img
            className="rounded-xl w-full object-cover h-auto transform group-hover:translate-y-[-2px] transition duration-200"
            src={image?.photo}
            alt={image?.name}
          />
          <div className="flex justify-between items-center w-full h-full">
            <div>
              <button
                className="font-inter font-medium bg-[#6469ff] mt-1 text-white px-4 py-2 rounded-md hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
                onClick={() => navigate("/")}
              >
                Go Back
              </button>
            </div>
            <p>
              {image?.name} - {image?.prompt}
            </p>
            <button
              type="button"
              onClick={() => downloadImage(image?._id, image?.photo)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert bg-white rounded-full p-1 hover:animate-spin"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
