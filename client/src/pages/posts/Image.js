import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { download } from "../../assets";
import { downloadImage } from "../../utils";

import axios from "axios";

const Image = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const button = document.querySelector(".header__button");
    button.innerHTML = "Login";
    button.href = "/login";
  }, []);

  const getUrlByID = `http://localhost:8000/api/post/${id}`;

  const fetchImage = async () => {
    setLoading(true);

    try {
      const response = await axios.get(getUrlByID, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setImage(response.data.data);
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
            className="rounded-xl w-full object-cover h-auto transform group-hover:translate-y-[-2px]"
            src={image?.photo}
            alt={image?.name}
          />
          <div className="flex justify-between items-center w-full ">
            <div>
              <button
                className="font-inter font-medium bg-[#6469] mt-1 text-white px-4 py-2 rounded-md hover:bg-[#b18eb199] hover:translate-y-[-1px] transition duration-200"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
            <p className="text-black text-sm xs:text-xs mx-2 my-1">
              <span className="text-[#000000e2] font-bold">{image?.name}</span>{" "}
              -{" "}
              <span className="text-[#1d161ddd] italic font-light">
                {image?.prompt}
              </span>
            </p>
            <button
              type="button"
              onClick={() => downloadImage(image?._id, image?.photo)}
              className="outline-none bg-transparent border-none"
            >
              <img
                src={download}
                alt="download"
                className="w-6 h-6 object-contain invert bg-white rounded-full p-1 
                hover:animate-spin"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
