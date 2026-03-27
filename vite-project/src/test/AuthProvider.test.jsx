import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthProvider } from '../context/AuthProvider';

const AuthDisplay = () => {
  const { isAuth, user, login, logout } = useContext(AuthContext);
  return (
    <div>
      <span data-testid="auth-status">{isAuth ? 'authorized' : 'not-authorized'}</span>
      <span data-testid="user-name">{user?.name || 'none'}</span>
      <button onClick={() => login('token123', 'Тест', 'test@mail.ru')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider — контекст авторизации', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('по умолчанию пользователь не авторизован', () => {
    render(
      <AuthProvider>
        <AuthDisplay />
      </AuthProvider>
    );
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authorized');
    expect(screen.getByTestId('user-name')).toHaveTextContent('none');
  });

  it('авторизует пользователя при вызове login', async () => {
    render(
      <AuthProvider>
        <AuthDisplay />
      </AuthProvider>
    );
    const user = userEvent.setup();

    await user.click(screen.getByText('Login'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('authorized');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Тест');
  });

  it('сохраняет данные в localStorage при login', async () => {
    render(
      <AuthProvider>
        <AuthDisplay />
      </AuthProvider>
    );
    const user = userEvent.setup();

    await user.click(screen.getByText('Login'));

    expect(localStorage.getItem('token')).toBe('token123');
    expect(localStorage.getItem('name')).toBe('Тест');
    expect(localStorage.getItem('email')).toBe('test@mail.ru');
  });

  it('деавторизует пользователя при вызове logout', async () => {
    render(
      <AuthProvider>
        <AuthDisplay />
      </AuthProvider>
    );
    const user = userEvent.setup();

    await user.click(screen.getByText('Login'));
    await user.click(screen.getByText('Logout'));

    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authorized');
    expect(screen.getByTestId('user-name')).toHaveTextContent('none');
  });

  it('очищает localStorage при logout', async () => {
    render(
      <AuthProvider>
        <AuthDisplay />
      </AuthProvider>
    );
    const user = userEvent.setup();

    await user.click(screen.getByText('Login'));
    await user.click(screen.getByText('Logout'));

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('name')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
  });

  it('восстанавливает авторизацию из localStorage', () => {
    localStorage.setItem('token', 'saved-token');
    localStorage.setItem('name', 'Сохранённый');
    localStorage.setItem('email', 'saved@mail.ru');

    render(
      <AuthProvider>
        <AuthDisplay />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status')).toHaveTextContent('authorized');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Сохранённый');
  });
});
