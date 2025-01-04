import AdminLogin from "../../components/admin/adminLogin.jsx";
import { motion } from "framer-motion";

const AdminLoginPage = () => {
  return (
    <>
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        exit={{ y: 2000 }}
        transition={{ duration: 0.5 }}
      >
        <AdminLogin />
      </motion.div>
    </>
  );
};
export default AdminLoginPage;
