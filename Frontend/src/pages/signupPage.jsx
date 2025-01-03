import Navbar from "../components/navbar.jsx";
import SignupForm from "../components/signup.jsx";
import { motion } from "framer-motion";
const SignupPage = () => {
  return (
    <>
      <Navbar buttonName={"Login"} />
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        exit={{ y: 1000 }}
        transition={{ duration: 0.5 }}
      >
        <SignupForm />
      </motion.div>
    </>
  );
};

export default SignupPage;
