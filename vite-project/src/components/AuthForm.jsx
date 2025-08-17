import { useNavigate, Link } from 'react-router-dom';

const AuthForm = ({ isSignUp, setIsAuth, formData, onChange, error, onSubmit }) => {
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    } else {
      setIsAuth(true);
      navigate('/');
    }
  };

  return (
    <div className="bg">
      <div className="modal">
        <div className="wrapper">
          <h2 className="title">{isSignUp ? 'Регистрация' : 'Вход'}</h2>
          <form className="form" id="form" onSubmit={handleAuth}>
            <div className="input-wrapper">
              {isSignUp && (
                <input
                  className="auth-input"
                  type="text"
                  name="name"
                  id="formname"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={onChange}
                />
              )}
              <input
                className="auth-input"
                type="text"
                name="email"
                id="formlogin"
                placeholder="Эл. почта"
                value={formData.email}
                onChange={onChange}
              />
              <input
                className="auth-input"
                type="password"
                name="password"
                id="formpassword"
                placeholder="Пароль"
                value={formData.password}
                onChange={onChange}
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button
              onClick={handleAuth}
              className="button-enter"
            >
              {isSignUp ? 'Зарегистрироваться' : 'Войти'}
            </button>

            {!isSignUp && (
              <div className="form-group">
                <p>Нужно зарегистрироваться?</p>
                <Link to="/register">Регистрируйтесь здесь</Link>
              </div>
            )}
            {isSignUp && (
              <div className="form-group">
                <p>
                  Есть аккаунт? <Link to="/login">Войдите здесь</Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;