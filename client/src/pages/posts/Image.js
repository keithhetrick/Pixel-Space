import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const getUrlByID = `https://localhost:8000/api/post/${id}`;

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

  const prev = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://localhost:8000/api/post", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // check the size of database
        const size = response.data.data.length;
        // get index of current post
        const index = response.data.data.findIndex(
          (post) => post._id === image._id
        );
        // get the previous post
        const prevPost = response.data.data[index - 1];
        console.log("PREV POST:", prevPost);

        if (index > 0) {
          setImage(prevPost);
          navigate(`/image/${prevPost._id}`);
        } else {
          // if the index of the current post is 0, then loop back around to the front & set the state to the first post
          setImage(response.data.data[size - 1]);
          navigate(`/image/${response.data.data[size - 1]._id}`);
        }
      } else {
        navigate("/404");
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  const next = async () => {
    setLoading(true);

    try {
      const response = await axios.get("https://localhost:8000/api/post", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // check the size of database
        const size = response.data.data.length;
        // get index of current post
        const index = response.data.data.findIndex(
          (post) => post._id === image._id
        );
        // get the next post
        const nextPost = response.data.data[index + 1];
        console.log("NEXT POST:", nextPost);

        if (index < size - 1) {
          setImage(nextPost);
          navigate(`/image/${nextPost._id}`);
        } else {
          // if the index of the current post is the last post, then loop back around to the front & set the state to the first post
          setImage(response.data.data[0]);
          navigate(`/image/${response.data.data[0]._id}`);
        }
      } else {
        navigate("/404");
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="block justify-between items-center w-full mb-3 -mt-5">
            <div className="flex justify-between">
              <ul className="flex list-style-none justify-between items-center w-full">
                <li className="page-item">
                  <a
                    className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 hover:translate-y-[-1px] focus:shadow-none"
                    href="#!"
                    aria-label="Next"
                    onClick={next}
                  >
                    <span aria-hidden="true" className="text-sm xs:text-xs">
                      &laquo; Next
                    </span>
                  </a>
                </li>
                <p className="text-[#1d161ddd] italic text-sm xs:text-xs">
                  {image?.name}
                </p>
                <li className="page-item">
                  <a
                    className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 hover:translate-y-[-1px] focus:shadow-none"
                    href="#!"
                    aria-label="Previous"
                    onClick={prev}
                  >
                    <span aria-hidden="true" className="text-sm xs:text-xs">
                      Prev &raquo;
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <img
            className="rounded-xl w-full object-cover h-auto transform group-hover:translate-y-[-2px]"
            src={image?.photo}
            alt={image?.name}
          />

          <div className="flex flex-col md:flex-row justify-between items-center w-full h-auto mt-3">
            <div>
              <button
                className="mt-1 px-9 py-3 mb-1 bg-gray-700 text-white font-medium text-xs leading-snug uppercase rounded-md shadow-md hover:bg-gray-600 hover:shadow-lg hover:translate-y-[-1px] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
            <p className="text-black text-sm xs:text-xs mx-2 my-3">
              <span className="text-[#000000e2] text-md font-bold">
                {image?.name}
              </span>{" "}
              -{" "}
              <span className="text-[#1d161ddd] italic font-light flex-wrap">
                {image?.prompt}
              </span>
            </p>
            <button
              type="button"
              onClick={() => downloadImage(image?._id, image?.photo)}
              className="outline-none bg-transparent border-none"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="download"
                className="w-6 mx-auto hover:animate-bounce text-gray-700"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
