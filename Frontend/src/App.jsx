import "./App.css";
import SignupPage from "./pages/signupPage.jsx";
import LoginPage from "./pages/loginPage.jsx";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/homepage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import AdminLoginPage from "./pages/Admin/adminLoginPage.jsx";
import AdminDashboard from "./components/admin/dashboard/adminDashboard.jsx";

function App() {
  const auth = useSelector((state) => state.user.isAuthenticated);
  return (
    <>
      <Routes>
        {/* User psths */}
        <Route
          path="/signup"
          element={!auth ? <SignupPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={!auth ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={auth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={auth ? <ProfilePage /> : <Navigate to="/login" />}
        />
        {/* Admin paths */}
        <Route path="/admin/login" element={<AdminLoginPage/>}/>
        <Route path="/dash" element={<AdminDashboard/>}/>
      </Routes>
    </>
  );
}

export default App;
