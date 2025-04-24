import { useState } from 'react';
import AuthForm from '../components/AuthForm';

function LoginPage({ setIsAuth }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Валидация
    if (!validateEmail(formData.email)) {
      setError('Некорректный адрес электронной почты');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (formData.email === 'ivan.ivanov@gmail.com' && formData.password !== '123456') {
      setError('Некорректные данные');
      return;
    }
    setError('');
    setIsAuth(true);
  };

  return (
    <AuthForm
      isSignUp={false}
      setIsAuth={setIsAuth}
      formData={{ ...formData, name: '' }}
      onChange={handleChange}
      error={error}
      onSubmit={handleLogin}
    />
  );
}

export default LoginPage;