import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const renderAuthForm = (props = {}) => {
  const defaultProps = {
    isSignUp: false,
    formData: { email: '', password: '' },
    onChange: vi.fn(),
    error: '',
    onSubmit: vi.fn(),
    ...props,
  };

  return render(
    <MemoryRouter>
      <AuthForm {...defaultProps} />
    </MemoryRouter>
  );
};

describe('AuthForm — форма авторизации', () => {
  it('отображает форму входа с полями email и пароль', () => {
    renderAuthForm();
    expect(screen.getByPlaceholderText('Эл. почта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  it('не отображает поле "Имя" в режиме входа', () => {
    renderAuthForm({ isSignUp: false });
    expect(screen.queryByPlaceholderText('Имя')).not.toBeInTheDocument();
  });

  it('отображает поле "Имя" в режиме регистрации', () => {
    renderAuthForm({
      isSignUp: true,
      formData: { name: '', email: '', password: '' },
    });
    expect(screen.getByPlaceholderText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
  });

  it('показывает ссылку на регистрацию в режиме входа', () => {
    renderAuthForm();
    expect(screen.getByText('Регистрируйтесь здесь')).toBeInTheDocument();
  });

  it('показывает ссылку на вход в режиме регистрации', () => {
    renderAuthForm({
      isSignUp: true,
      formData: { name: '', email: '', password: '' },
    });
    expect(screen.getByText('Войдите здесь')).toBeInTheDocument();
  });

  it('отображает сообщение об ошибке', () => {
    renderAuthForm({ error: 'Неверный email или пароль' });
    expect(screen.getByText('Неверный email или пароль')).toBeInTheDocument();
  });

  it('не отображает ошибку если её нет', () => {
    renderAuthForm({ error: '' });
    expect(screen.queryByText('Неверный email или пароль')).not.toBeInTheDocument();
  });

  it('вызывает onChange при вводе в поле email', async () => {
    const onChange = vi.fn();
    renderAuthForm({ onChange });
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText('Эл. почта');
    await user.type(emailInput, 'a');

    expect(onChange).toHaveBeenCalled();
  });

  it('вызывает onChange при вводе в поле пароля', async () => {
    const onChange = vi.fn();
    renderAuthForm({ onChange });
    const user = userEvent.setup();

    const passwordInput = screen.getByPlaceholderText('Пароль');
    await user.type(passwordInput, 'x');

    expect(onChange).toHaveBeenCalled();
  });

  it('вызывает onSubmit при нажатии кнопки "Войти"', async () => {
    const onSubmit = vi.fn((e) => e.preventDefault());
    renderAuthForm({ onSubmit });
    const user = userEvent.setup();

    await user.click(screen.getByText('Войти'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('заголовок "Вход" отображается в режиме входа', () => {
    renderAuthForm();
    expect(screen.getByText('Вход')).toBeInTheDocument();
  });

  it('заголовок "Регистрация" отображается в режиме регистрации', () => {
    renderAuthForm({
      isSignUp: true,
      formData: { name: '', email: '', password: '' },
    });
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
  });
});
