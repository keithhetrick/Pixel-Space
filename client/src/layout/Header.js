import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useHeaderButton } from "../hooks/useHeaderButton";

const Header = ({ title, link }) => {
  const headerButton = useHeaderButton({
    title: title || "Create",
    link: link || "/create-post",
  });

  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <div className="flex flex-col items-center sm:block">
        <div className="flex flex-row items-center justify-center sm:justify-start sm:mb-0">
          <p className="text-gray-700 text-[10px] -mt-1">
            <span className="text-[16px] mr-[2px] pixel__space__text">
              Pixel Space{" "}
            </span>
            powered by:
          </p>
        </div>
        <Link to="/">
          <img src={logo} alt="logo" className="w-24 object-contain" />
        </Link>
      </div>

      <headerButton.type {...headerButton.props} />
    </header>
  );
};

export default Header;
