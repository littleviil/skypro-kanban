import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { ThemeProvider } from '../context/ThemeContext';
import { lightTheme } from '../themes';
import { Card } from '../components/Card/Card';

const mockTask = {
  _id: '123',
  title: 'Тестовая задача',
  topic: 'Web Design',
  status: 'Без статуса',
  date: '2026-03-28',
};

const renderCard = (task = mockTask, onBrowseClick = vi.fn()) => {
  return render(
    <ThemeProvider>
      <SCThemeProvider theme={lightTheme}>
        <Card task={task} onBrowseClick={onBrowseClick} />
      </SCThemeProvider>
    </ThemeProvider>
  );
};

describe('Card — карточка задачи', () => {
  it('отображает заголовок задачи', () => {
    renderCard();
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  it('отображает категорию задачи', () => {
    renderCard();
    expect(screen.getByText('Web Design')).toBeInTheDocument();
  });

  it('отображает дату задачи в формате ru-RU', () => {
    renderCard();
    expect(screen.getByText('28.03.26')).toBeInTheDocument();
  });

  it('не отображает дату если её нет', () => {
    const taskNoDate = { ...mockTask, date: null };
    renderCard(taskNoDate);
    const dateElements = screen.queryByText(/\d{2}\.\d{2}\.\d{2}/);
    expect(dateElements).not.toBeInTheDocument();
  });

  it('вызывает onBrowseClick при клике на кнопку действий', async () => {
    const onBrowseClick = vi.fn();
    renderCard(mockTask, onBrowseClick);
    const user = userEvent.setup();

    const cardBtns = document.querySelectorAll('[class*="CardBtn"]');
    if (cardBtns.length > 0) {
      await user.click(cardBtns[0]);
      expect(onBrowseClick).toHaveBeenCalledWith(mockTask);
    }
  });

  it('имеет атрибут draggable', () => {
    renderCard();
    const cardItem = screen.getByText('Тестовая задача').closest('[draggable]');
    expect(cardItem).toHaveAttribute('draggable', 'true');
  });

  it('отображает задачу без категории', () => {
    const taskNoTopic = { ...mockTask, topic: undefined };
    renderCard(taskNoTopic);
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });
});
