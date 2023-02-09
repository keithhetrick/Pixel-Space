export const useHeaderButton = ({ title, link }) => {
  return (
    <a
      href={link}
      className="header__button font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md hover:bg-[#4d52e8] hover:translate-y-[-1px] transition duration-200"
    >
      {title}
    </a>
  );
};
