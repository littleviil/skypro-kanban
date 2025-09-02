import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PopBrowse from "../components/popus/PopBrowse/PopBrowse";
import { TaskContext } from '../context/TaskContext';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, refreshTasks } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const task = tasks.find(task => task.id === parseInt(id) || task._id === id);
    if (task) {
      setSelectedTask(task);
    } else {
      navigate('/');
    }
  }, [id, tasks, navigate]);

  const handleClose = () => {
    navigate('/');
  };

  const handleTaskUpdate = async () => {
    await refreshTasks();
    navigate('/');
  };

  if (!selectedTask) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <PopBrowse
        task={selectedTask}
        onClose={handleClose}
        onTaskUpdate={handleTaskUpdate}
        isEditMode={true}
      />
    </div>
  );
};

export default EditCardPage;