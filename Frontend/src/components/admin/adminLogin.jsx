import { useState } from "react";
import LoginForm from "../loginForm.jsx";
import { schema } from "../../utils/validationYup.jsx";
import { DataBase } from "../../api/axios.jsx";

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [err, setErr] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await schema.validateAt("email", formData);
      setErr({});
      setLoading(false);
      try {
        const response =await DataBase.post('admin/login',formData)
        console.log(response.data)
      } catch (error) {
        console.log(error.response.data.message)
      }
    } catch (error) {
      setErr({ email: error.message });
      setLoading(false);
    }
  };
  return (
    <>
      <LoginForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        formData={formData}
        err={err}
        admin={true}
      />
    </>
  );
};

export default AdminLogin;
