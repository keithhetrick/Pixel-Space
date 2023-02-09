import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, CreatePost, Image, User, EditUser, CreateUser } from "./pages";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Login from "./auth/Login";
import ErrorLandingPage from "./pages/ErrorLandingPage";

// Add errorLandingPage to Routes & route any other path to errorLandingPage

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
          <Route path="/create-user/" element={<CreateUser />} />
          <Route path="/user/:id/edit" element={<EditUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorLandingPage />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
