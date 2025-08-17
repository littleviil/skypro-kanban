import { useState, useContext } from "react";
import AuthForm from "../components/AuthForm";
import { signUp } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

function RegisterPage() {
  const { setIsAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [errorFields, setErrorFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorFields((prev) => ({ ...prev, [name]: false }));
    setError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setErrorFields({});

    let newErrorFields = {};
    if (!formData.name) {
      setError("Пожалуйста, введите имя");
      newErrorFields.name = true;
    }
    if (!validateEmail(formData.email)) {
      setError("Некорректный адрес электронной почты");
      newErrorFields.email = true;
    }
    if (!formData.password || formData.password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов");
      newErrorFields.password = true;
    }
    if (Object.keys(newErrorFields).length > 0) {
      setErrorFields(newErrorFields);
      return;
    }

    try {
      const user = await signUp({
        name: formData.name,
        login: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", user.token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", formData.email);

      setIsAuth(true);
    } catch (err) {
      setError(err.message || "Не удалось зарегистрироваться");
      setErrorFields({
        name: true,
        email: true,
        password: true,
      });
    }
  };

  return (
    <AuthForm
      isSignUp={true}
      formData={formData}
      onChange={handleChange}
      error={error}
      errorFields={errorFields}
      onSubmit={handleRegister}
    />
  );
}

export default RegisterPage;
