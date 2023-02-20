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

export const useHeaderButton = ({ title, link }) => {
  return (
    <a
      href={link}
      className="header__button font-inter px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded-md shadow-md hover:shadow-lg hover:bg-blue-500 hover:translate-y-[-1px] focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-200 ease-in-out flex justify-center items-center mb-3l"
    >
      {title}
    </a>
  );
};
