import { useState } from "react";
import CommonBtn from "../../../SignInLoginButton.jsx";
import { motion } from "framer-motion";
const CreateUserModal = ({ isOpen, setIsOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  //modal close
  const cancel = () => {
    setIsOpen(false);
    setFormData({
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: "",
    });
  };
  ///handlechanges in input filed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 10 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-xs"
            onClick={setIsOpen}
          >
            <div
              className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="insert-0 flex justify-center mt-13 p-10">
                <h1 className="font-bold text-2xl">Create User</h1>
              </div>
              <form className="space-y-5">
                <div className="px-14 pb-10">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300"
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
                        className="appearance-none mb-3 bg-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="John Doe"
                      />
                      {/* {err.username && (
                    <span className="text-red-500 text-xs p-2">
                      {err.username}
                    </span>
                  )} */}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300"
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
                        className="appearance-none mb-3  bg-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="Moblile Number"
                      />
                      {/* {err.phone && (
                    <span className="text-red-500 text-xs p-2">
                      {err.phone}
                    </span>
                  )} */}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300"
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
                        className="appearance-none mb-3  bg-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="john@gmail.com"
                      />
                      {/* {err.email && (
                    <span className="text-red-500 text-xs p-2">
                      {err.email}
                    </span>
                  )} */}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300"
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
                        className="appearance-none mb-3  bg-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="••••••••"
                      />
                      {/* {err.password && (
                    <span className="text-red-500 text-xs p-2">
                      {err.password}
                    </span>
                  )} */}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium  text-gray-300"
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
                        className=" appearance-none mb-5  bg-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="••••••••"
                      />
                      {/* {err.confirmPassword && (
                    <span className="text-red-500 text-xs p-2">
                      {err.confirmPassword}
                    </span>
                  )} */}
                      <div className="mb-5 flex ">
                        <div className="flex items-center">
                          <input
                            id="admin"
                            value={"admin"}
                            type="radio"
                            onChange={handleChange}
                            name="role"
                          />
                          <label htmlFor="admin" className="pl-2">
                            Admin
                          </label>
                        </div>
                        <div className="flex items-center ml-3">
                          <input
                            id="user"
                            value={"user"}
                            type="radio"
                            name="role"
                            onChange={handleChange}
                            defaultChecked
                          />
                          <label htmlFor="user" className="pl-2">
                            User
                          </label>
                        </div>
                        <div className="flex items-center ml-3">
                          <input
                            id="manager"
                            value={"manager"}
                            onChange={handleChange}
                            type="radio"
                            name="role"
                          />
                          <label htmlFor="manager" className="pl-2">
                            Manager
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 ">
                    <CommonBtn btnName={"Cancel"} clickEvent={cancel} type={"button"} />
                    <CommonBtn btnName={"Create"} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CreateUserModal ;
