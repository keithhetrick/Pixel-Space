import { Route, Routes } from "react-router-dom";
import {
  Home,
  CreatePost,
  GetPosts,
  Image,
  User,
  EditUserWrapper,
  UserPostsWrapper,
  ViewUsers,
  ErrorLandingPage,
} from "./pages";
import { ROLES } from "./config/roles";
import Login from "./auth/Login";
import Layout from "./layout/Layout";
import Register from "./auth/Register";
import AltLogin from "./auth/AltLogin";
import Welcome from "./features/auth/Welcome";
import RequireAuth from "./features/auth/RequireAuth";
import UsersList from "./features/users/UsersList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="alt-login" element={<AltLogin />} />
          <Route path="posts" element={<GetPosts />} />
          <Route path="image/:id" element={<Image />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/users">
            <Route path=":id" element={<User />} />
            <Route path="view" element={<ViewUsers />} />
            <Route path="list" element={<UsersList />} />
            <Route path=":id/edit" element={<EditUserWrapper />} />
            <Route path=":id/posts/*" element={<UserPostsWrapper />} />
          </Route>

          <Route path="welcome" element={<Welcome />} />
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          ></Route>

          {/* Error Routes */}
          <Route path="*" element={<ErrorLandingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
