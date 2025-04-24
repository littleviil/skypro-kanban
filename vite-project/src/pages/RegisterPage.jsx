import { useState } from 'react';
import AuthForm from '../components/AuthForm';

function RegisterPage({ setIsAuth }) {
  const [formData, setFormData] = useState({
    name: '',
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

  const handleRegister = (e) => {
    e.preventDefault();

    if (!formData.name) {
      setError('Пожалуйста, введите имя');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Некорректный адрес электронной почты');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (formData.email === 'ivan.ivanov@gmail.com') {
      setError('Этот email уже зарегистрирован');
      return;
    }

    setError('');
    setIsAuth(true);
  };

  return (
    <AuthForm
      isSignUp={true}
      setIsAuth={setIsAuth}
      formData={formData}
      onChange={handleChange}
      error={error}
      onSubmit={handleRegister}
    />
  );
}

export default RegisterPage;