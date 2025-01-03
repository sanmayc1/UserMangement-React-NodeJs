import Login from "../components/login.jsx";
import Navbar from "../components/navbar.jsx";
import { motion } from "framer-motion";
const LoginPage = () => {
  return (
    <>
      <Navbar buttonName={"Sign Up"} />
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        exit={{ y: 2000 }}
        transition={{ duration: 0.5 }}
      >
        <Login />
      </motion.div>
    </>
  );
};

export default LoginPage;
