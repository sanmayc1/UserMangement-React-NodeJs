import { Navigate } from "react-router-dom"


const AdminRoutes = ({auth,role,children})=>{
    if(!auth){
        return <Navigate to={"/admin/login"}/>
    }
    if(role !== "admin"){
        return <Navigate to={"/admin/login"}/>
    }

    return children
}
export default AdminRoutes