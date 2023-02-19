import { Route, Routes } from "react-router-dom";
import {
  Home,
  CreatePost,
  Image,
  User,
  EditUserWrapper,
  UserPostsWrapper,
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
            <Route path="create-post" element={<CreatePost />} />
            <Route path="image/:id" element={<Image />} />
            <Route path="users/:id" element={<User />} />
            <Route path="register/" element={<Register />} />

            {/* Protected Routes */}
            <Route path="welcome" element={<Welcome />} />
            <Route path="users/view" element={<ViewUsers />} />
            <Route path="userslist" element={<UsersList />} />
            <Route path="users/:id/edit" element={<EditUserWrapper />} />
            <Route path="users/:id/posts/*" element={<UserPostsWrapper />} />
            <Route element={<RequireAuth />}></Route>

            {/* Error Routes */}
            <Route path="*" element={<ErrorLandingPage />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
