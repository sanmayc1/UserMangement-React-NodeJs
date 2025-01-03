import { useState } from "react";
import ReactLoading from "react-loading";
import CommonBtn from "./SignInLoginButton.jsx";
import { schema } from "../utils/validationYup.jsx";
import { DataBase } from "../api/axios";
import { login } from "../Store/Slice/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken } from "../Store/Slice/authToken.js";

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
      console.log(path, message);
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
      console.log(path, message);
    }
  };

  return (
    <>
      <div className="min-h-screen pt-32">
        <div className="sm:mx-auto sm:w-full sm:max-w-md ">
          <h2 className="text-center text-3xl font-extrabold text-white">
            Login
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="john@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {err.email && (
                    <span className="text-red-500 text-xs p-2">
                      {err.email}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {err.loginErr && (
                    <span className="text-red-500 text-xs p-2">
                      {err.loginErr}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <CommonBtn
                  btnName={
                    loading ? (
                      <ReactLoading width={20} height={20} type="spin" />
                    ) : (
                      "Login"
                    )
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
