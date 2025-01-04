import { useState } from "react";
import { schema } from "../utils/validationYup.jsx";
import { DataBase } from "../api/axios.jsx";
import { login } from "../Store/Slice/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken } from "../Store/Slice/authToken.js";
import LoginForm from "./loginForm.jsx";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //handle Change
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedData = { [name]: value };
    setFormData((prev) => ({ ...prev, [name]: value }));

    try {
      if (name === "email") {
        await schema.validateAt("email", updatedData);
        setErr({});
      }
    } catch (validatationErr) {
      const { message, path } = validatationErr;
      setErr({ [path]: message });
      
    }
  };

  //hadnle submit
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      await schema.validateAt("email", formData);

      try {
        const response = await DataBase.post("/user/login", formData);

        const { username, id, role } = response.data.userDetails;
        dispatch(login({ username, id, role }));
        dispatch(addToken({ token: response.data.token }));
        setLoading(false);
        navigate("/home");
      } catch (error) {
        setLoading(false);
        const status = error.response?.status;
        if (status === 401) {
          setErr(error.response.data);
        }
      }
    } catch (validatationErr) {
      setLoading(false);
      const { message, path } = validatationErr;
      setErr({ [path]: message });
    }
  };

  return (
    <>
     <LoginForm loading={loading} handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} err={err}/>
    </>
  );
};

export default Login;
