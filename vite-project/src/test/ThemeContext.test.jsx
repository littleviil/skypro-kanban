import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from '../context/ThemeContext';

const ThemeDisplay = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme-status">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext — переключение темы', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('по умолчанию тема светлая', () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  it('переключается на тёмную тему при клике', async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    await user.click(screen.getByText('Toggle'));

    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });

  it('переключается обратно на светлую при двойном клике', async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    await user.click(screen.getByText('Toggle'));
    await user.click(screen.getByText('Toggle'));

    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  it('сохраняет тему в localStorage', async () => {
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    await user.click(screen.getByText('Toggle'));

    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('восстанавливает тёмную тему из localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });

  it('при отсутствии значения в localStorage — светлая тема', () => {
    localStorage.removeItem('theme');
    render(
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });
});
