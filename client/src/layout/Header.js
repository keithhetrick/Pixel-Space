import { Link } from "react-router-dom";
import { logo } from "../assets";
import { useHeaderButton } from "../hooks/useHeaderButton";

const Header = ({ title, link }) => {
  const headerButton = useHeaderButton({
    title: title || "Create",
    link: link || "/create-post",
  });

  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-6 py-6 border-b border-b-[#e6ebf4]">
      <div className="flex flex-col items-center sm:block">
        <div className="flex flex-row items-center justify-center sm:justify-start sm:mb-0">
          <p className="inline-block text-gray-700 text-[10px] ">
            <span className="text-[16px] mr-[1px] pt-[2.5px] pb-[2.5px] pixel__space__text">
              Pixel Space{" "}
            </span>
            <span className="pt-[8.5px] pb-[3.5px] relative top-[1px]">
              powered by:
            </span>
          </p>
        </div>
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-24 p-1 object-contain mt-[1px]"
          />
        </Link>
      </div>

      <headerButton.type {...headerButton.props} />
    </header>
  );
};

export default Header;
