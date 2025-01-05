import { motion } from "framer-motion";
import CommonBtn from "../../../SignInLoginButton.jsx";
import { DataBase } from "../../../../api/axios.jsx";
import { baseUrl } from "../../../../api/constants.jsx";
import { User } from "lucide-react";
import {  useState } from "react";
import { schema } from "../../../../utils/validationYup.jsx";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { tostConfig } from "../../../../utils/tostify.jsx";

const EditUserModal = ({ isOpen, setIsOpen, userDetails }) => {
  if (!isOpen) {
    return null;
  }

  const [formData, setFormData] = useState({
    username: userDetails.username || "",
    email: userDetails.email || "",
    phone: userDetails.phone || "",
  });

  //onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //onSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validateAt("username", formData);
      await schema.validateAt("email", formData);
      await schema.validateAt("phone", formData);

      try {
        const response = await DataBase.patch(
          `admin/edituser/${userDetails._id}`,
          formData
        );

        if (response.status === 200) {
          toast.success("User updated successfully", tostConfig);
          setTimeout(() => setIsOpen(false), 2000);
        }
      } catch (responseErr) {
        console.log(responseErr.response);
        toast.error(responseErr.response.data.message, tostConfig);
      }
    } catch (error) {
      if (error) {
        toast.error(error.message, tostConfig);
      }
    }
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
                    src={`${baseUrl}${userDetails.profilePic}`}
                    alt=""
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-800 rounded-full flex justify-center items-center">
                    <User size={80} />
                  </div>
                )}
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
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
                        value={formData.username}
                        type="text"
                        className="appearance-none mb-3 bg-gray-700 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                        placeholder="John Doe"
                      />
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
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="dark"
            transition={Bounce}
          />
        </motion.div>
      )}
    </>
  );
};

export default EditUserModal;
