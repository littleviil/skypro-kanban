import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopNewCard from "../components/popus/PopNewCard/PopNewCard";
import { createKanbanTask } from '../services/api'; 

const NewCardPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Design',
    status: 'Без статуса',
    date: new Date().toLocaleDateString('ru-RU'),
  });

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
    await createKanbanTask({ token, task: formData });
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
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewCardPage;