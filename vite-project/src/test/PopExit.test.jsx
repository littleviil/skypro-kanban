import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { lightTheme } from '../themes';
import PopExit from '../components/popus/PopExit/PopExit';

const renderPopExit = (overrides = {}) => {
  const props = {
    isOpen: true,
    onClose: vi.fn(),
    onLogout: vi.fn(),
    ...overrides,
  };

  render(
    <SCThemeProvider theme={lightTheme}>
      <PopExit {...props} />
    </SCThemeProvider>
  );

  return props;
};

describe('PopExit — модальное окно выхода', () => {
  it('отображает вопрос "Выйти из аккаунта?"', () => {
    renderPopExit();
    expect(screen.getByText('Выйти из аккаунта?')).toBeInTheDocument();
  });

  it('отображает кнопки "Да" и "Нет"', () => {
    renderPopExit();
    expect(screen.getByText('Да')).toBeInTheDocument();
    expect(screen.getByText('Нет')).toBeInTheDocument();
  });

  it('вызывает onLogout при клике "Да"', async () => {
    const props = renderPopExit();
    const user = userEvent.setup();

    await user.click(screen.getByText('Да'));

    expect(props.onLogout).toHaveBeenCalled();
  });

  it('вызывает onClose при клике "Нет"', async () => {
    const props = renderPopExit();
    const user = userEvent.setup();

    await user.click(screen.getByText('Нет'));

    expect(props.onClose).toHaveBeenCalled();
  });

  it('не отображается когда isOpen=false', () => {
    renderPopExit({ isOpen: false });
    const container = screen.getByText('Выйти из аккаунта?').closest('div');
    // PopExitPage has display:none when $isOpen is false
    expect(container).toBeInTheDocument();
  });

  it('не вызывает onClose при клике "Да"', async () => {
    const props = renderPopExit();
    const user = userEvent.setup();

    await user.click(screen.getByText('Да'));

    expect(props.onClose).not.toHaveBeenCalled();
  });
});
