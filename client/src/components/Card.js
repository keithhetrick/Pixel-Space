import { useNavigate } from "react-router-dom";
import { downloadImage } from "../utils";

const Card = ({ _id, name, prompt, photo }) => {
  const navigate = useNavigate();
  const handleImageClick = () =>
    navigate(`/image/${_id}`, { state: { image: photo, prompt, name, _id } });

  const handleUserClick = () => navigate(`/user/${_id}`);

  return (
    <div
      className="rounded-xl group p-4 relative shadow-card hover:shadow-cardhover card transition duration-500 cursor-pointer"
      onClick={handleImageClick}
    >
      <img
        className="rounded-xl w-full object-cover h-auto transform group-hover:translate-y-[-2px] 
        hover:shadow-lg transition duration-200"
        src={photo}
        alt={prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto prompt">{prompt}</p>

        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2" onClick={handleUserClick}>
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">
              {name[0]}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="download"
              className="w-5 mx-auto hover:animate-bounce text-gray-200"
              role="img"
              xmlns="https://www.w3.org/2000/svg"
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
      {/* {prompt && (
        <div className="absolute bottom-0 left-0 right-0 rounded-md">
          <p className="text-black text-xs overflow-y-auto prompt">{name}</p>
        </div>
      )} */}
    </div>
  );
};

export default Card;
