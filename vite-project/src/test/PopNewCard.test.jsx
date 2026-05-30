import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PopNewCard from '../components/popus/PopNewCard/PopNewCard';

const defaultFormData = {
  title: '',
  description: '',
  topic: 'Web Design',
  status: 'Без статуса',
  date: new Date().toISOString(),
};

const renderPopNewCard = (overrides = {}) => {
  const props = {
    formData: { ...defaultFormData },
    setFormData: vi.fn(),
    onClose: vi.fn(),
    onSubmit: vi.fn(),
    ...overrides,
  };

  render(<PopNewCard {...props} />);
  return props;
};

describe('PopNewCard — модальное окно создания задачи', () => {
  it('отображает заголовок "Создание задачи"', () => {
    renderPopNewCard();
    expect(screen.getByText('Создание задачи')).toBeInTheDocument();
  });

  it('отображает поле для названия задачи', () => {
    renderPopNewCard();
    expect(screen.getByPlaceholderText('Введите название задачи...')).toBeInTheDocument();
  });

  it('отображает поле для описания задачи', () => {
    renderPopNewCard();
    expect(screen.getByPlaceholderText('Введите описание задачи...')).toBeInTheDocument();
  });

  it('отображает кнопку "Создать задачу"', () => {
    renderPopNewCard();
    expect(screen.getByText('Создать задачу')).toBeInTheDocument();
  });

  it('отображает категории задач', () => {
    renderPopNewCard();
    expect(screen.getByText('Web Design')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('Copywriting')).toBeInTheDocument();
  });

  it('показывает ошибку при отправке пустого названия', async () => {
    const props = renderPopNewCard({
      formData: { ...defaultFormData, title: '', description: 'Описание' },
    });
    const user = userEvent.setup();

    await user.click(screen.getByText('Создать задачу'));

    expect(screen.getByText('Введите название задачи')).toBeInTheDocument();
    expect(props.onSubmit).not.toHaveBeenCalled();
  });

  it('показывает ошибку при отправке пустого описания', async () => {
    const props = renderPopNewCard({
      formData: { ...defaultFormData, title: 'Задача', description: '' },
    });
    const user = userEvent.setup();

    await user.click(screen.getByText('Создать задачу'));

    expect(screen.getByText('Введите описание задачи')).toBeInTheDocument();
    expect(props.onSubmit).not.toHaveBeenCalled();
  });

  it('вызывает onSubmit и onClose при валидной форме', async () => {
    const props = renderPopNewCard({
      formData: { ...defaultFormData, title: 'Задача', description: 'Описание' },
    });
    const user = userEvent.setup();

    await user.click(screen.getByText('Создать задачу'));

    expect(props.onSubmit).toHaveBeenCalled();
    expect(props.onClose).toHaveBeenCalled();
  });

  it('вызывает onClose при клике на кнопку закрытия', async () => {
    const props = renderPopNewCard();
    const user = userEvent.setup();

    await user.click(screen.getByText('✕'));

    expect(props.onClose).toHaveBeenCalled();
  });

  it('вызывает setFormData при выборе категории', async () => {
    const props = renderPopNewCard();
    const user = userEvent.setup();

    await user.click(screen.getByText('Research'));

    expect(props.setFormData).toHaveBeenCalled();
  });

  it('вызывает setFormData при вводе в поле названия', async () => {
    const props = renderPopNewCard();
    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText('Введите название задачи...');
    await user.type(titleInput, 'a');

    expect(props.setFormData).toHaveBeenCalled();
  });
});
