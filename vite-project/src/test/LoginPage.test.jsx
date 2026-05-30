import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LoginPage from '../pages/LoginPage';

vi.mock('../services/auth', () => ({
  signIn: vi.fn(),
}));

import { signIn } from '../services/auth';

beforeEach(() => {
  vi.clearAllMocks();
});

const renderLoginPage = (authOverrides = {}) => {
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
        <LoginPage />
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return authValue;
};

describe('LoginPage — страница входа', () => {
  it('отображает форму входа', () => {
    renderLoginPage();
    expect(screen.getByText('Вход')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Эл. почта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
  });

  it('показывает ошибку при пустых полях', async () => {
    renderLoginPage();
    const user = userEvent.setup();

    await user.click(screen.getByText('Войти'));

    expect(screen.getByText('Пожалуйста, заполните все поля')).toBeInTheDocument();
  });

  it('вызывает signIn и login при успешной авторизации', async () => {
    signIn.mockResolvedValue({ token: 'abc', name: 'Тест' });
    const authValue = renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Эл. почта'), 'test@mail.ru');
    await user.type(screen.getByPlaceholderText('Пароль'), '123456');
    await user.click(screen.getByText('Войти'));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({ login: 'test@mail.ru', password: '123456' });
    });
    expect(authValue.login).toHaveBeenCalledWith('abc', 'Тест', 'test@mail.ru');
  });

  it('показывает ошибку при неверных данных', async () => {
    signIn.mockRejectedValue(new Error('Неверный email или пароль'));
    renderLoginPage();
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText('Эл. почта'), 'wrong@mail.ru');
    await user.type(screen.getByPlaceholderText('Пароль'), 'wrong');
    await user.click(screen.getByText('Войти'));

    await waitFor(() => {
      expect(screen.getByText('Неверный email или пароль')).toBeInTheDocument();
    });
  });

  it('редиректит на / если пользователь авторизован', () => {
    renderLoginPage({ isAuth: true });
    expect(screen.queryByText('Вход')).not.toBeInTheDocument();
  });
});
