import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

function LoginPage({ setIsAuth }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [errorFields, setErrorFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorFields((prev) => ({ ...prev, [name]: false }));
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setError('');
    setErrorFields({});

    let newErrorFields = {};
    if (!validateEmail(formData.email)) {
      setError('Некорректный адрес электронной почты');
      newErrorFields.email = true;
    }
    if (!formData.password || formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      newErrorFields.password = true;
    }
    if (Object.keys(newErrorFields).length > 0) {
      setErrorFields(newErrorFields);
      return;
    }

    if (formData.email === 'ivan.ivanov@gmail.com' && formData.password !== '123456') {
      setError('Некорректные данные');
      setErrorFields({ email: true, password: true });
      return;
    }

    setError('');
    setErrorFields({});
    setIsAuth(true);
    navigate('/');
  };

  return (
    <AuthForm
      isSignUp={false}
      setIsAuth={setIsAuth}
      formData={{ ...formData, name: '' }}
      onChange={handleChange}
      error={error}
      errorFields={errorFields}
      onSubmit={handleLogin}
    />
  );
}

export default LoginPage;