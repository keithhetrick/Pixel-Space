import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, CreatePost, Image } from "./pages";
// import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <div className="flex flex-col items-center sm:block">
          <div className="flex flex-row items-center justify-center sm:justify-start sm:mb-0">
            {/* <img
              src="/pixelspace-icon.png"
              alt="logo"
              className="w-5 object-contain -mt-2"
            /> */}
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
      </header>

      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/image/:id" element={<Image />} />
          {/* <Route path="/user/:id" element={<User />} /> */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
