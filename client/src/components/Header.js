import { Link } from "react-router-dom";
import { logo } from "../assets";
// import HeaderLoginButton from "./HeaderLoginButton";

const Header = () => {
  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <div className="flex flex-col items-center sm:block">
        <div className="flex flex-row items-center justify-center sm:justify-start sm:mb-0">
          <p className="font-inter font-medium text-[#222328] text-[8px] -mt-1">
            <span className="text-[15px] mr-[2px] pixel__space__text">
              Pixel Space{" "}
            </span>
            powered by:
          </p>
        </div>
        <Link to="/">
          <img src={logo} alt="logo" className="w-24 object-contain" />
        </Link>
      </div>
      <Link
        to="/create-post"
        className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
      >
        Create
      </Link>
      {/* <HeaderLoginButton /> */}
    </header>
  );
};

export default Header;
