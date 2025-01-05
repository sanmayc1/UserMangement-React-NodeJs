import Profile from "../components/user/profile.jsx";
import { motion } from 'framer-motion';
const ProfilePage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 10 }}
        exit={{ opacity: 0 }}
      >
        <Profile />
      </motion.div>
    </>
  );
};

export default ProfilePage;
