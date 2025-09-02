import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopNewCard from "../components/popus/PopNewCard/PopNewCard";

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
    return [];
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleSubmit = async () => {
    console.log('Создание новой задачи:', formData);
    navigate('/');
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