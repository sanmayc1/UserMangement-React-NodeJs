import "./App.css";
import SignupPage from "./pages/signupPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/User/homepage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import AdminLoginPage from "./pages/Admin/adminLoginPage.jsx";
import AdminDashboardPage from "./pages/Admin/adminDashBoardPage.jsx";
import AdminRoutes from "./utils/guardComponent.jsx";

function App() {
  const auth = useSelector((state) => state.user.isAuthenticated);
  const role = useSelector((state) => state.user.role);
  return (
    <>
      <Routes>
        {/* User psths */}

        {/* User Sign Up */}
        <Route
          path="/signup"
          element={!auth ? <SignupPage /> : <Navigate to="/home" />}
        />

        {/* User Login */}
        <Route
          path="/login"
          element={
            role === "user" ? (
              auth ? (
                <Navigate to="/home" />
              ) : (
                <LoginPage />
              )
            ) : (
              <LoginPage />
            )
          }
        />

        {/* User Home */}
        <Route
          path="/home"
          element={
            auth ? (
              role === "user" ? (
                <HomePage />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* User Profile */}
        <Route
          path="/profile"
          element={
            auth ? (
              role === "user" ? (
                <ProfilePage />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin route */}

        {/* Admin login page */}
        <Route
          path="/admin/login"
          element={
            role === "admin" ? (
              auth ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <AdminLoginPage />
              )
            ) : (
              <AdminLoginPage />
            )
          }
        />

        {/* Admin dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoutes role={role} auth={auth}>
              <AdminDashboardPage />
            </AdminRoutes>
          }
        />
      </Routes>
    </>
  );
}

export default App;
