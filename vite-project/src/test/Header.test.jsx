import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { lightTheme } from '../themes';
import { Header } from '../components/Header/Header';

beforeEach(() => {
  localStorage.clear();
});

const renderHeader = (overrides = {}) => {
  const props = {
    onNewCardClick: vi.fn(),
    ...overrides,
  };

  const authValue = {
    isAuth: true,
    user: { token: 'test-token', name: 'Тест', email: 'test@mail.ru' },
    login: vi.fn(),
    logout: vi.fn(),
  };

  render(
    <MemoryRouter>
      <AuthContext.Provider value={authValue}>
        <ThemeProvider>
          <SCThemeProvider theme={lightTheme}>
            <Header {...props} />
          </SCThemeProvider>
        </ThemeProvider>
      </AuthContext.Provider>
    </MemoryRouter>
  );

  return props;
};

describe('Header — шапка приложения', () => {
  it('отображает логотип', () => {
    renderHeader();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('отображает кнопку "Создать новую задачу"', () => {
    renderHeader();
    expect(screen.getByText('Создать новую задачу')).toBeInTheDocument();
  });

  it('вызывает onNewCardClick при клике на кнопку создания', async () => {
    const props = renderHeader();
    const user = userEvent.setup();

    await user.click(screen.getByText('Создать новую задачу'));

    expect(props.onNewCardClick).toHaveBeenCalled();
  });

  it('отображает имя пользователя из localStorage', () => {
    localStorage.setItem('name', 'Иван');
    renderHeader();
    expect(screen.getByText('Иван')).toBeInTheDocument();
  });

  it('отображает "Пользователь" если имя не задано', () => {
    renderHeader();
    expect(screen.getByText('Пользователь')).toBeInTheDocument();
  });

  it('открывает PopUser при клике на имя пользователя', async () => {
    localStorage.setItem('name', 'Тест');
    localStorage.setItem('email', 'test@mail.ru');
    renderHeader();
    const user = userEvent.setup();

    await user.click(screen.getByText('Тест'));

    expect(screen.getByText('test@mail.ru')).toBeInTheDocument();
  });
});
