import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { openAILogo } from "../assets";
import useHeaderButton from "../hooks/useHeaderButton";
// import { useGetSingleUserQuery } from "../features/users/usersApiSlice";
// import { useGetUsersQuery } from "../features/users/usersApiSlice";
// import { useEffect, useState } from "react";

const Header = ({ title, link, allUsers, singleUser }) => {
  // const { data: userData } = useGetUsersQuery({});
  // const { data: singleUserData } = useGetSingleUserQuery({});

  // get the user data from the store of whoevers logged in
  // const { data: userData } = useGetSingleUserQuery({});
  // console.log("APP - user: ", userData);

  // console.log("APP - user?.data?.id: ", singleUserData?.data?._id);

  const headerButton = useHeaderButton({
    title: title || "Create",
    link: link || "/create-post",
  });

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode"))
  );

  // toggle dark mode
  const toggleDarkMode = () => {
    if (!darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkMode(true);
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setDarkMode(false);
    }

    // set local storage to true
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));

    if (!localStorage.getItem("darkMode")) {
      setDarkMode(false);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    if (!localStorage.getItem("darkMode")) {
      setDarkMode(false);
    }
  }, [darkMode]);

  return (
    <header className="w-full flex justify-between items-center bg-white px-4 py-6 sm:px-8 border-b border-b-[#e6ebf4]">
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
            src={openAILogo}
            alt="Open AI Logo"
            className="w-24 p-1 object-contain mt-[1px] header__logo"
          />
        </Link>
      </div>

      <div className="flex flex-row items-center gap-6">
        <button
          type="button"
          className="focus:outline-none"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-gray-400 animate-pulse active:animate-ping hover:text-gray-500 rounded-full transition  ease-in-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707M18.364 6.364l-.707.707M6.343 18.343l-.707.707"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-800 dark:text-gray-300 animate-pulse active:animate-ping hover:text-gray-500 rounded-full transition ease-in-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707M18.364 6.364l-.707.707M6.343 18.343l-.707.707"
              />
            </svg>
          )}
        </button>
        <headerButton.type {...headerButton.props} />
        {/* <HeaderButton title={title} link={link} /> */}
      </div>
    </header>
  );
};

export default Header;
