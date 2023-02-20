import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const DashLayout = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DashLayout;
