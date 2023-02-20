// import { Link } from "react-router-dom";

// export const useHeaderButton = ({ title, link }) => {
//   const HeaderButton = () => {
//     return (
//       <Link
//         to={link}
//         className="header__button font-inter px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg hover:bg-blue-500 hover:translate-y-[-1px] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out flex justify-center items-center mb-3l"
//       >
//         {title}
//       </Link>
//     );
//   };

//   return HeaderButton;
// };

// MAIN LOGIC THAT IS BEING USED IN THE COMPONENT

const useHeaderButton = ({ title, link }) => {
  return (
    <a
      href={link}
      className="header__button font-inter px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg hover:bg-blue-500 hover:translate-y-[-1px] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out flex justify-center items-center mb-3l"
    >
      {title}
    </a>
  );
};

// import { useEffect } from "react";

// const useHeaderButton = ({ title, link }) => {
//   // make a function that will set the header button title & link - use Link from react-router-dom to link to home page and let it be able to be changed in any component/url that uses this hook
//   const setHeaderButton = () => {
//     const headerButton = document.querySelector(".header__button");
//     headerButton.innerHTML = title;
//     headerButton.setAttribute("href", link);
//   };

//   useEffect(
//     () => {
//       setHeaderButton();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [title, link]
//   );

//   return setHeaderButton;
// };

export default useHeaderButton;
