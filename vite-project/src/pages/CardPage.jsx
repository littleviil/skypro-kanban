import { useParams, useNavigate } from 'react-router-dom';
import { tasks } from '../tasks';

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return <div>Задача с ID {id} не найдена</div>;
  }

  return (
    <CardWrapper>
      <CardTitle>Карточка #{id}</CardTitle>
      <p><strong>Название:</strong> {task.title}</p>
      <p><strong>Категория:</strong> {task.category}</p>
      <p><strong>Дата:</strong> {task.date}</p>
      <p><strong>Статус:</strong> {task.status}</p>
      <Button onClick={() => navigate(`/card/edit/${id}`)}>Редактировать</Button>
      <Button onClick={() => navigate('/')}>Назад</Button>
    </CardWrapper>
  );
}

export default CardPage;