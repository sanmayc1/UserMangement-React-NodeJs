import Login from "../components/login.jsx";
import Navbar from "../components/navbar.jsx";

const LoginPage = () => {
  return (
    <>
      <Navbar buttonName={"Sign Up"} />
      <Login/>
    </>
  );
};

export default LoginPage;
