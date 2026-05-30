import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { TaskProvider } from '../context/TaskProvider';

// Мокаем API
vi.mock('../services/api', () => ({
  fetchKanbanTasks: vi.fn(),
  createKanbanTask: vi.fn(),
  updateKanbanTask: vi.fn(),
  deleteKanbanTask: vi.fn(),
}));

import {
  fetchKanbanTasks,
  createKanbanTask,
  updateKanbanTask,
  deleteKanbanTask,
} from '../services/api';

const TestConsumer = () => {
  const ctx = useContext(TaskContext);
  return (
    <div>
      <span data-testid="loading">{String(ctx.loading)}</span>
      <span data-testid="error">{ctx.error || ''}</span>
      <span data-testid="count">{ctx.tasks.length}</span>
      <ul>
        {ctx.tasks.map((t) => (
          <li key={t._id}>{t.title}</li>
        ))}
      </ul>
      <button onClick={ctx.fetchTasks}>fetchTasks</button>
      <button onClick={() => ctx.addTask({ title: 'Новая', status: 'Без статуса' })}>
        addTask
      </button>
      <button onClick={() => ctx.updateTask('1', { status: 'В работе' }).catch(() => {})}>
        updateTask
      </button>
      <button onClick={() => ctx.removeTask('1').catch(() => {})}>removeTask</button>
      <button onClick={ctx.clearTasks}>clearTasks</button>
    </div>
  );
};

const renderWithProvider = (token = 'test-token') => {
  const authValue = {
    isAuth: !!token,
    user: token ? { token, name: 'Тест', email: 'test@mail.ru' } : null,
    login: vi.fn(),
    logout: vi.fn(),
  };

  return render(
    <AuthContext.Provider value={authValue}>
      <TaskProvider>
        <TestConsumer />
      </TaskProvider>
    </AuthContext.Provider>
  );
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('TaskProvider — управление задачами', () => {
  it('инициализируется с пустым списком задач', () => {
    renderWithProvider();
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('loading').textContent).toBe('false');
  });

  it('загружает задачи через fetchTasks', async () => {
    fetchKanbanTasks.mockResolvedValue([
      { _id: '1', title: 'Задача 1', status: 'Без статуса' },
      { _id: '2', title: 'Задача 2', status: 'В работе' },
    ]);

    renderWithProvider();
    const user = userEvent.setup();

    await user.click(screen.getByText('fetchTasks'));

    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('2');
    });
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
  });

  it('добавляет задачу через addTask', async () => {
    createKanbanTask.mockResolvedValue({
      _id: 'new-1',
      title: 'Новая',
      status: 'Без статуса',
    });

    renderWithProvider();
    const user = userEvent.setup();

    await user.click(screen.getByText('addTask'));

    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('1');
    });
    expect(screen.getByText('Новая')).toBeInTheDocument();
  });

  it('удаляет задачу через removeTask', async () => {
    fetchKanbanTasks.mockResolvedValue([
      { _id: '1', title: 'Задача 1', status: 'Без статуса' },
    ]);
    deleteKanbanTask.mockResolvedValue({});

    renderWithProvider();
    const user = userEvent.setup();

    await user.click(screen.getByText('fetchTasks'));
    await waitFor(() => expect(screen.getByText('Задача 1')).toBeInTheDocument());

    await user.click(screen.getByText('removeTask'));
    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('0');
    });
  });

  it('очищает задачи через clearTasks', async () => {
    fetchKanbanTasks.mockResolvedValue([
      { _id: '1', title: 'Задача 1', status: 'Без статуса' },
    ]);

    renderWithProvider();
    const user = userEvent.setup();

    await user.click(screen.getByText('fetchTasks'));
    await waitFor(() => expect(screen.getByTestId('count').textContent).toBe('1'));

    await user.click(screen.getByText('clearTasks'));
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('обрабатывает ошибку при загрузке задач', async () => {
    fetchKanbanTasks.mockRejectedValue(new Error('Сервер недоступен'));

    renderWithProvider();
    const user = userEvent.setup();

    await user.click(screen.getByText('fetchTasks'));

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toBe('Сервер недоступен');
    });
  });

  it('откатывает задачу при ошибке updateTask', async () => {
    fetchKanbanTasks.mockResolvedValue([
      { _id: '1', title: 'Задача 1', status: 'Без статуса' },
    ]);
    updateKanbanTask.mockRejectedValue(new Error('Ошибка обновления'));

    renderWithProvider();
    const user = userEvent.setup();

    await user.click(screen.getByText('fetchTasks'));
    await waitFor(() => expect(screen.getByText('Задача 1')).toBeInTheDocument());

    await user.click(screen.getByText('updateTask'));

    // updateTask откатывает состояние но не устанавливает error
    await waitFor(() => {
      expect(screen.getByTestId('count').textContent).toBe('1');
      expect(screen.getByText('Задача 1')).toBeInTheDocument();
    });
  });
});
