import { motion } from "framer-motion";
import CommonBtn from "../../../SignInLoginButton.jsx";
import { DataBase } from "../../../../api/axios.jsx";
import { User } from "lucide-react";

const EditUserModal = ({ isOpen, setIsOpen, userDetails }) => {
  console.log;
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
            onClick={() => setIsOpen(false)}
          >
            <div
              className="relative w-full max-w-md bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="insert-0 flex justify-center mt-13 p-10">
                <h1 className="font-bold text-2xl">Edit User</h1>
              </div>
              <div className="flex justify-center w-full pb-2">
                {userDetails?.profilePic ? (
                  <img
                    className="max-w-32 rounded-full"
                    src={`http://localhost:8080/${userDetails.profilePic}`}
                    alt=""
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-800 rounded-full flex justify-center items-center">
                    <User size={80} />
                  </div>
                )}
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
                        // onChange={handleChange}
                        value={userDetails.username}
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
                        // onChange={handleChange}
                        value={userDetails.phone}
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
                        // onChange={handleChange}
                        value={userDetails.email}
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
                  <div className="flex gap-2 mt-5 ">
                    <CommonBtn
                      btnName={"Cancel"}
                      clickEvent={() => setIsOpen(false)}
                      type={"button"}
                    />
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

export default EditUserModal;
