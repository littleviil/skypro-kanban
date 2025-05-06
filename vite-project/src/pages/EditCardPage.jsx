import { useParams, useNavigate } from 'react-router-dom';
import PopBrowse from '../components/popus/PopBrowse/PopBrowse';
import { tasks } from '../tasks';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === parseInt(id));

  const handleClose = () => {
    navigate('/');
  };

  if (!task) {
    return <div>Задача не найдена</div>;
  }

  return (
    <div className="page-container">
      <PopBrowse task={task} onClose={handleClose} />
    </div>
  );
};

export default EditCardPage;