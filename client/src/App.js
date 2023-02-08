import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, CreatePost, Image } from "./pages";
import User from "./pages/User";
import Header from "./components/Header";
import EditUser from "./pages/EditUser";
import NewUser from "./pages/NewUser";
import Footer from "./components/Footer";
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(95vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/image/:id" element={<Image />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/user/" element={<NewUser />} />
          <Route path="/user/:id/edit" element={<EditUser />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
