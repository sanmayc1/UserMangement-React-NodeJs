import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { schema } from "../utils/validationYup.jsx";
import { DataBase } from "../api/axios.jsx";
import ReactLoading from "react-loading";
import CommonBtn from "./SignInLoginButton.jsx";
import { toast, ToastContainer } from "react-toastify";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [err, setErr] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //live validation Checking
  const handleChange = async (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    try {
      await schema.validateAt(name, updatedFormData);

      setErr((prevErr) => {
        const { [name]: _, ...remaingErr } = prevErr;
        return remaingErr;
      });
    } catch (validationError) {
      setErr((prevErr) => ({ ...prevErr, [name]: validationError.message }));
    }
  };

  //after submit logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await schema.validate(formData, { abortEarly: false });
      setErr({});
      try {
        const response = await DataBase.post("/user/signup", formData);
        if (response.status === 201) {
          setLoading(false);
          navigate("/login");
        }
      } catch (error) {
        setLoading(false);
        const status = error.response?.status;
        if (status === 400) {
          setErr(error.response.data.validationErr);
        } else if (status === 409) {
          setErr(error.response.data);
        } else {
          toast.error("Something went wrong", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      const validatationErr = {};
      error.inner.forEach((err) => {
        const { path, message } = err;
        validatationErr[path] = message;
      });
      setErr(validatationErr);
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="username"
                  onChange={handleChange}
                  value={formData.name}
                  type="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  placeholder="John Doe"
                />
                {err.username && (
                  <span className="text-red-500 text-xs p-2">
                    {err.username}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  onChange={handleChange}
                  value={formData.phone}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  placeholder="Moblile Number"
                />
                {err.phone && (
                  <span className="text-red-500 text-xs p-2">{err.phone}</span>
                )}
              </div>
            </div>

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
                  onChange={handleChange}
                  value={formData.email}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  placeholder="john@gmail.com"
                />
                {err.email && (
                  <span className="text-red-500 text-xs p-2">{err.email}</span>
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
                  onChange={handleChange}
                  value={formData.password}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  placeholder="••••••••"
                />
                {err.password && (
                  <span className="text-red-500 text-xs p-2">
                    {err.password}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 mb-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  value={formData.confirmPassword}
                  className=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                  placeholder="••••••••"
                />
                {err.confirmPassword && (
                  <span className="text-red-500 text-xs p-2">
                    {err.confirmPassword}
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
                    "Sign Up"
                  )
                }
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
