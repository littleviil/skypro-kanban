import { useParams, useNavigate } from 'react-router-dom';
import PopBrowse from '../components/popus/PopBrowse/PopBrowse';
import { tasks } from '../tasks';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const taskId = parseInt(id);
  const task = tasks.find((task) => task.id === taskId);

  const handleClose = () => {
    navigate('/');
  };

  if (!task || isNaN(taskId)) {
    navigate('/');
    return null;
  }

  return (
    <div className="modal-overlay">
      <PopBrowse task={task} onClose={handleClose} />
    </div>
  );
};

export default EditCardPage;