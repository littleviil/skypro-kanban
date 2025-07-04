import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { signUp } from '../services/auth';

function RegisterPage({ setIsAuth }) {
  const navigate = useNavigate();
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
    setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password } = formData;
    if (!name || !email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    console.log('Отправляемые данные:', { name, login: email, password });

    try {
      const user = await signUp({
        name,
        login: email,
        password,
      });
      console.log('Ответ сервера:', user);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      console.error('Ошибка:', err);
      setError(err.message || 'Ошибка регистрации');
    }
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