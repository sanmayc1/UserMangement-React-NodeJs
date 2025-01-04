import { useDispatch, useSelector } from "react-redux";
import { ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { logout as Logout } from "../Store/Slice/userSlice.js";
import { removeToken } from "../Store/Slice/authToken.js";
const Home = () => {
    const username = useSelector((state)=>state.user.username)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const logout=()=>{
          dispatch(removeToken())
          dispatch(Logout())
          navigate("/login");
    }

    const profile = ()=>{
        navigate('/profile')
    }
  return (
    <>
     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">UMS React</div>
          <div className="hidden md:flex space-x-8">
            <button className="hover:text-red-500 transition-colors" onClick={logout} >Logout</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 pt-40">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-blue-400">UMS React</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Hello {username} !
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={profile} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Profile
              <ArrowRight className="w-5 h-5" />
            </button>
           
          </div>
        </div>
      </main>
    </div>
    
      
    </>
  );
};
export default Home;
