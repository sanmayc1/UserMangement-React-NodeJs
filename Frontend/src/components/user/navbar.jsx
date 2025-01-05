import { useNavigate } from "react-router-dom";
import CommonBtn from "../SignInLoginButton.jsx";

function Navbar({buttonName}) {

    const navigate = useNavigate()

    const clickEvent = ()=>{
        if(buttonName === "Sign Up"){
            navigate('/signup')
        }else if(buttonName==="Login"){
            navigate('/login')
        }
    }

  return (
    <>
      <div className="w-full h-20 flex justify-between items-center font-sans px-8 fixed ">
        <h1 className="text-white text-xl box-border p-1 font-bold">
          UMS React
        </h1>
       <div>
        <CommonBtn clickEvent={clickEvent} btnName={buttonName}/>
       </div>
      </div>

    </>
  );
}
export default Navbar;
