import { Link } from "react-router-dom";
import { openAILogo } from "../assets";
import useHeaderButton from "../hooks/useHeaderButton";
// import { useGetSingleUserQuery } from "../features/users/usersApiSlice";
// import { useEffect, useState } from "react";

const Header = ({ title, link, allUsers, singleUser }) => {
  // const { data: userData } = useGetSingleUserQuery({});
  // console.log("APP - user: ", userData);
  // console.log("APP - user?.data?.id: ", userData?.data?.id);

  // console.log("HEADER - allUsers: ", allUsers);
  // console.log("HEADER - singleUser: ", singleUser);

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
            src={openAILogo}
            alt="Open AI Logo"
            className="w-24 p-1 object-contain mt-[1px]"
          />
        </Link>
      </div>

      <div>
        {/* show user name here */}
        <p className="text-gray-700 text-[10px] ">
          <span className="text-[16px] mr-[1px] pt-[2.5px] pb-[2.5px] pixel__space__text">
            {/* test */}
          </span>
        </p>
      </div>

      <headerButton.type {...headerButton.props} />
    </header>
  );
};

export default Header;
