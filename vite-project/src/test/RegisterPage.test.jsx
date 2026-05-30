import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import RegisterPage from '../pages/RegisterPage';

vi.mock('../services/auth', () => ({
  signUp: vi.fn(),
  signIn: vi.fn(),
}));

import { signUp } from '../services/auth';

beforeEach(() => {
  vi.clearAllMocks();
});

const renderRegisterPage = (authOverrides = {}) => {
  const authValue = {
    isAuth: false,
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
    ...authOverrides,
  };

  render(
    <MemoryRouter>
      <AuthContext.Provider value={authValue}>
        <RegisterPage />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return authValue;
};

describe('RegisterPage — страница регистрации', () => {
  it('отображает форму регистрации', () => {
    renderRegisterPage();
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Имя')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Эл. почта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
  });

  it('показывает ошибку при пустом имени', async () => {
    renderRegisterPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Эл. почта'), 'test@mail.ru');
    await user.type(screen.getByPlaceholderText('Пароль'), '123456');
    await user.click(screen.getByText('Зарегистрироваться'));

    expect(screen.getByText('Пожалуйста, введите имя')).toBeInTheDocument();
  });

  it('показывает ошибку при некорректном email', async () => {
    renderRegisterPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Имя'), 'Тест');
    await user.type(screen.getByPlaceholderText('Эл. почта'), 'bad-email');
    await user.type(screen.getByPlaceholderText('Пароль'), '123456');
    await user.click(screen.getByText('Зарегистрироваться'));

    expect(screen.getByText('Некорректный адрес электронной почты')).toBeInTheDocument();
  });

  it('показывает ошибку при коротком пароле', async () => {
    renderRegisterPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Имя'), 'Тест');
    await user.type(screen.getByPlaceholderText('Эл. почта'), 'test@mail.ru');
    await user.type(screen.getByPlaceholderText('Пароль'), '123');
    await user.click(screen.getByText('Зарегистрироваться'));

    expect(screen.getByText('Пароль должен содержать минимум 6 символов')).toBeInTheDocument();
  });

  it('вызывает signUp и login при валидных данных', async () => {
    signUp.mockResolvedValue({ token: 'abc', name: 'Тест' });
    const authValue = renderRegisterPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Имя'), 'Тест');
    await user.type(screen.getByPlaceholderText('Эл. почта'), 'test@mail.ru');
    await user.type(screen.getByPlaceholderText('Пароль'), '123456');
    await user.click(screen.getByText('Зарегистрироваться'));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        name: 'Тест',
        login: 'test@mail.ru',
        password: '123456',
      });
    });
    expect(authValue.login).toHaveBeenCalledWith('abc', 'Тест', 'test@mail.ru');
  });

  it('показывает ошибку сервера при неудачной регистрации', async () => {
    signUp.mockRejectedValue(new Error('Email уже занят'));
    renderRegisterPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Имя'), 'Тест');
    await user.type(screen.getByPlaceholderText('Эл. почта'), 'test@mail.ru');
    await user.type(screen.getByPlaceholderText('Пароль'), '123456');
    await user.click(screen.getByText('Зарегистрироваться'));

    await waitFor(() => {
      expect(screen.getByText('Email уже занят')).toBeInTheDocument();
    });
  });

  it('редиректит на / если пользователь авторизован', () => {
    renderRegisterPage({ isAuth: true });
    expect(screen.queryByText('Регистрация')).not.toBeInTheDocument();
  });
});
