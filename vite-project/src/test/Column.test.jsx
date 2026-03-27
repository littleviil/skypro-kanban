import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { ThemeProvider } from '../context/ThemeContext';
import { TaskContext } from '../context/TaskContext';
import { lightTheme } from '../themes';
import Column from '../components/Column/Column';

const mockTasks = [
  { _id: '1', title: 'Задача 1', topic: 'Web Design', status: 'Без статуса', date: '2026-03-28' },
  { _id: '2', title: 'Задача 2', topic: 'Research', status: 'Без статуса', date: '2026-03-29' },
  { _id: '3', title: 'Задача 3', topic: 'Copywriting', status: 'В работе', date: '2026-03-30' },
];

const renderColumn = (status = 'Без статуса', tasks = mockTasks, overrides = {}) => {
  const taskContextValue = {
    loading: false,
    updateTask: vi.fn(),
    ...overrides,
  };

  return render(
    <ThemeProvider>
      <SCThemeProvider theme={lightTheme}>
        <TaskContext.Provider value={taskContextValue}>
          <Column status={status} onBrowseClick={vi.fn()} tasks={tasks} />
        </TaskContext.Provider>
      </SCThemeProvider>
    </ThemeProvider>
  );
};

describe('Column — колонка канбан-доски', () => {
  it('отображает заголовок колонки', () => {
    renderColumn('Без статуса');
    expect(screen.getByText('Без статуса')).toBeInTheDocument();
  });

  it('отображает только задачи с соответствующим статусом', () => {
    renderColumn('Без статуса');
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
    expect(screen.queryByText('Задача 3')).not.toBeInTheDocument();
  });

  it('отображает задачи со статусом "В работе"', () => {
    renderColumn('В работе');
    expect(screen.getByText('Задача 3')).toBeInTheDocument();
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  });

  it('отображает пустую колонку если нет задач с таким статусом', () => {
    renderColumn('Готово');
    expect(screen.getByText('Готово')).toBeInTheDocument();
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Задача 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Задача 3')).not.toBeInTheDocument();
  });

  it('отображает скелетоны при загрузке', () => {
    renderColumn('Без статуса', mockTasks, { loading: true });
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  });

  it('работает с пустым массивом задач', () => {
    renderColumn('Без статуса', []);
    expect(screen.getByText('Без статуса')).toBeInTheDocument();
  });
});
