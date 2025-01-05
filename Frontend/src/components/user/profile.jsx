import React, { useEffect, useState } from "react";
import { Camera, Save, Mail, Phone, User } from "lucide-react";
import { DataBase } from "../../api/axios.jsx";
import { toast, ToastContainer } from "react-toastify";
import { schema } from "../../utils/validationYup.jsx";
import CommonBtn from "../SignInLoginButton.jsx";
import { baseUrl } from "../../api/constants.jsx";
const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [profileData, setProfileData] = useState({
    username: "",
    phone: "",
    email: "",
    profilePic: null,
  });

  //fecthing user details

  useEffect(() => {
    const fecthUserData = async () => {
      try {
        const response = await DataBase.get("/user/profile");
        const { username, phone, email, profilePic } = response.data;
        setProfileData({ username, phone, email, profilePic });
        if (profilePic) {
          setPreviewUrl(`${baseUrl}${profilePic}`);
        }
      } catch (errors) {
        console.log("err");
        const err = errors.response.data.message || errors.message;
        tostErr(err);
      }
    };
    fecthUserData();
  }, []);

  // profile picture change and add to show preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileData((prev) => ({ ...prev, profilePic: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setEdit(true);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //filed change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit(true);
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  //form submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validateAt("username", profileData);
      await schema.validateAt("phone", profileData);
      const formData = new FormData();
      formData.append("profile", profileData.profilePic);
      formData.append("username", profileData.username);
      formData.append("phone", profileData.phone);
      try {
        const response = await DataBase.post("/user/profileupdate", formData);
        setEdit(false);
      } catch (error) {}
    } catch (validationErr) {
      tostErr(validationErr.message);
    }
  };
  // error message alert

  const tostErr = (err) => {
    toast.error(err, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-700 mb-4">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Profile preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Click the camera icon to upload a new photo
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={profileData.username}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-xs text-red-500"></span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      defaultValue={profileData.email}
                      disabled
                      className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 hover:cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">
                    Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end">
                <div className="max-w-fit flex-col ">
                  {edit && (
                    <CommonBtn
                      btnName={
                        <>
                          <Save className="w-5 h-5" />
                          Save Changes
                        </>
                      }
                    />
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
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
    </>
  );
};

export default Profile;
