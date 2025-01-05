import { useNavigate } from "react-router-dom"
import { logout } from "../../../Store/Slice/userSlice.js"
import { useDispatch } from "react-redux"
import { removeToken } from "../../../Store/Slice/authToken.js"
const Header = ()=>{
    const dispath = useDispatch()
    const navigate = useNavigate()

    const adminLogout =()=>{
      dispath(logout())
      dispath(removeToken())
      navigate('/admin/login')
    }
    return(
        <header >
        <div className="px-14 py-9 w-full flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <h1 className="text-white hover:text-red-500" onClick={adminLogout} >Logout</h1>
        </div>
      </header>
    )
}

export default Header