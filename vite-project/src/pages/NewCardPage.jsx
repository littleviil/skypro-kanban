import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopNewCard from "../components/popus/PopNewCard/PopNewCard";
import { createKanbanTask, fetchKanbanTasks } from '../services/api';

const NewCardPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    status: 'Без статуса',
    date: new Date().toLocaleDateString('ru-RU'),
  });

  const refreshTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token) return [];
    try {
      const data = await fetchKanbanTasks(token);
      console.log('Список задач обновлён:', data);
      return data;
    } catch (error) {
      console.error('Ошибка при загрузке задач:', error);
      return [];
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await createKanbanTask(formData);
      await refreshTasks();
      navigate('/');
    } catch (error) {
      console.error('Ошибка создания задачи:', error.message);
    }
  };

  return (
    <div>
      <PopNewCard
        formData={formData}
        setFormData={setFormData}
        onClose={handleClose}
        refreshTasks={refreshTasks}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewCardPage;
