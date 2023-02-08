// import { logo } from "../assets";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center w-full mb-6">
      <p className="flex font-inter font-medium items-center text-[#222328] text-[8px] gap-[3px]">
        Copyright &copy;{" "}
        <span className="text-[15px] pixel__space__text">Pixel Space </span>
        {/* powered by: */}
        {/* 2023 */}
        {/* <img
          src="/pixelspace-icon.png"
          alt="logo"
          className="w-3 object-contain"
        /> */}
      </p>
      {/* <img src={logo} alt="logo" className="w-6 object-contain mt-[4px]" /> */}
    </footer>
  );
};

export default Footer;
