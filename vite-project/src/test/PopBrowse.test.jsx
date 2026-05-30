import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskContext } from '../context/TaskContext';
import PopBrowse from '../components/popus/PopBrowse/PopBrowse';

const mockTask = {
  _id: '123',
  title: 'Тестовая задача',
  description: 'Описание задачи',
  status: 'Без статуса',
  topic: 'Web Design',
  date: '2026-03-28T00:00:00.000Z',
};

const renderPopBrowse = (task = mockTask, overrides = {}) => {
  const contextValue = {
    updateTask: vi.fn(),
    removeTask: vi.fn(),
    ...overrides,
  };

  const onClose = vi.fn();

  render(
    <TaskContext.Provider value={contextValue}>
      <PopBrowse task={task} onClose={onClose} />
    </TaskContext.Provider>
  );

  return { onClose, ...contextValue };
};

describe('PopBrowse — модальное окно просмотра/редактирования задачи', () => {
  it('отображает заголовок задачи', () => {
    renderPopBrowse();
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  it('отображает категорию задачи', () => {
    renderPopBrowse();
    expect(screen.getByText('Web Design')).toBeInTheDocument();
  });

  it('отображает описание задачи', () => {
    renderPopBrowse();
    expect(screen.getByDisplayValue('Описание задачи')).toBeInTheDocument();
  });

  it('отображает текущий статус задачи', () => {
    renderPopBrowse();
    expect(screen.getByText('Без статуса')).toBeInTheDocument();
  });

  it('textarea заблокировано в режиме просмотра', () => {
    renderPopBrowse();
    const textarea = screen.getByDisplayValue('Описание задачи');
    expect(textarea).toBeDisabled();
  });

  it('кнопка "Редактировать задачу" присутствует', () => {
    renderPopBrowse();
    expect(screen.getByText('Редактировать задачу')).toBeInTheDocument();
  });

  it('переключает в режим редактирования по клику', async () => {
    renderPopBrowse();
    const user = userEvent.setup();

    await user.click(screen.getByText('Редактировать задачу'));

    expect(screen.getByText('Сохранить')).toBeInTheDocument();
    expect(screen.getByText('Отменить')).toBeInTheDocument();

    const textarea = screen.getByDisplayValue('Описание задачи');
    expect(textarea).not.toBeDisabled();
  });

  it('отображает все статусы в режиме редактирования', async () => {
    renderPopBrowse();
    const user = userEvent.setup();

    await user.click(screen.getByText('Редактировать задачу'));

    expect(screen.getByText('Нужно сделать')).toBeInTheDocument();
    expect(screen.getByText('В работе')).toBeInTheDocument();
    expect(screen.getByText('Тестирование')).toBeInTheDocument();
    expect(screen.getByText('Готово')).toBeInTheDocument();
  });

  it('отменяет редактирование и возвращает исходные данные', async () => {
    renderPopBrowse();
    const user = userEvent.setup();

    await user.click(screen.getByText('Редактировать задачу'));

    const textarea = screen.getByDisplayValue('Описание задачи');
    await user.clear(textarea);
    await user.type(textarea, 'Новое описание');

    await user.click(screen.getByText('Отменить'));

    expect(screen.getByDisplayValue('Описание задачи')).toBeInTheDocument();
    expect(screen.getByText('Редактировать задачу')).toBeInTheDocument();
  });

  it('вызывает removeTask и onClose при удалении', async () => {
    const { removeTask, onClose } = renderPopBrowse();
    const user = userEvent.setup();

    const deleteButtons = screen.getAllByText('Удалить задачу');
    await user.click(deleteButtons[0]);

    expect(removeTask).toHaveBeenCalledWith('123');
  });

  it('вызывает onClose при клике на "Закрыть"', async () => {
    const { onClose } = renderPopBrowse();
    const user = userEvent.setup();

    await user.click(screen.getByText('Закрыть'));

    expect(onClose).toHaveBeenCalled();
  });

  it('вызывает updateTask при сохранении', async () => {
    const { updateTask } = renderPopBrowse();
    const user = userEvent.setup();

    await user.click(screen.getByText('Редактировать задачу'));
    await user.click(screen.getByText('Сохранить'));

    expect(updateTask).toHaveBeenCalledWith('123', expect.objectContaining({
      title: 'Тестовая задача',
      description: 'Описание задачи',
    }));
  });
});
