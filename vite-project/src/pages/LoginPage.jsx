import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { signIn } from "../services/auth";
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;
    if (!email || !password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    try {
      const user = await signIn({ login: email, password });
      localStorage.setItem("token", user.token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", email);

      setIsAuth(true);
    } catch (err) {
      setError(err.message || "Ошибка авторизации");
    }
  };

  if (isAuth) return <Navigate to="/" replace />;

  return (
    <AuthForm
      isSignUp={false}
      formData={formData}
      onChange={handleChange}
      error={error}
      onSubmit={handleLogin}
    />
  );
}

export default LoginPage;