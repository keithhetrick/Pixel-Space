import { Route, Routes } from "react-router-dom";
import {
  Home,
  CreatePost,
  Image,
  User,
  EditUser,
  ViewUsers,
  ErrorLandingPage,
} from "./pages";
import Login from "./auth/Login";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Layout from "./layout/Layout";
import Register from "./auth/Register";
import AltLogin from "./auth/AltLogin";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <div>
      <Header />

      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(95vh-73px)]">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="alt-login" element={<AltLogin />} />
            <Route path="login" element={<Login />} />

            {/* Protected Routes */}
            <Route path="welcome" element={<Welcome />} />
            <Route path="userslist" element={<UsersList />} />
            <Route element={<RequireAuth />}></Route>
          </Route>

          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/image/:id" element={<Image />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/view" element={<ViewUsers />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
          <Route path="*" element={<ErrorLandingPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
