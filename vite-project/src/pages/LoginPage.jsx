import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { signIn } from '../services/auth';

function LoginPage({ setIsAuth }) {
  const navigate = useNavigate();
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
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const { email, password } = formData;
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    console.log('Отправляемые данные:', { login: email, password });

    try {
      const user = await signIn({
        login: email,
        password,
      });
      console.log('Ответ сервера:', user);
      setIsAuth(true);
      navigate('/');
    } catch (err) {
      console.error('Ошибка:', err);
      setError(err.message || 'Ошибка авторизации');
    }
  };

  return (
    <AuthForm
      isSignUp={false}
      setIsAuth={setIsAuth}
      formData={formData}
      onChange={handleChange}
      error={error}
      onSubmit={handleLogin}
    />
  );
}

export default LoginPage;