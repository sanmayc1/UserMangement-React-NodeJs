import AdminDashboard from "../../components/admin/dashboard/adminDashboard.jsx"
import { motion } from 'framer-motion';
const AdminDashboardPage = ()=>{
    return(
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 10 }}
        exit={{ opacity: 0 }}
      >
        <AdminDashboard/>
        </motion.div>
    )
}

export default AdminDashboardPage