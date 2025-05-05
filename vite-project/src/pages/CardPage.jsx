import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tasks } from '../tasks';
import { CardWrapper, CardTitle, Button } from '../components/Card/Card.styled';
import { PopExit } from '../components/popus/PopExit/PopExit';
import { PopNewCard } from '../components/popus/PopNewCard/PopNewCard';
import { PopBrowse } from '../components/popus/PopBrowse/PopBrowse';

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === parseInt(id));
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopNewCardOpen, setIsPopNewCardOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);

  if (!task) {
    return <div>Задача не найдена</div>;
  }

  return (
    <>
      {isPopExitOpen && <PopExit onClose={() => setIsPopExitOpen(false)} />}
      {isPopNewCardOpen && (
        <PopNewCard onClose={() => setIsPopNewCardOpen(false)} />
      )}
      {isPopBrowseOpen && (
        <PopBrowse
          task={task}
          onClose={() => setIsPopBrowseOpen(false)}
        />
      )}
      <CardWrapper>
        <CardTitle>Карточка</CardTitle>
        <p><strong>Название:</strong> {task.title}</p>
        <p><strong>Категория:</strong> {task.category}</p>
        <p><strong>Дата:</strong> {task.date}</p>
        <p><strong>Статус:</strong> {task.status}</p>
        <Button onClick={() => navigate(`/card/edit/${id}`)}>Редактировать</Button>
        <Button onClick={() => navigate('/')}>Назад</Button>
        <Button onClick={() => setIsPopBrowseOpen(true)}>Просмотреть</Button>
      </CardWrapper>
    </>
  );
}

export default CardPage;