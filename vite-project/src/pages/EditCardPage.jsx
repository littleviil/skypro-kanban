import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PopBrowse from '../components/popus/PopBrowse/PopBrowse';
import { getTasks } from '../services/dataSource';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTaskData = async () => {
      if (!token) {
        navigate('/login');
        return;
      }
      setLoading(true);
      const tasks = await getTasks('EditCardPage', token);
      const foundTask = tasks.find((t) => t.id === parseInt(id));
      setTask(foundTask || null);
      setLoading(false);
    };
    fetchTaskData();
  }, [id, token, navigate]);

  const handleClose = () => {
    navigate('/');
  };

  if (loading) return <div>Загрузка...</div>;
  if (!task) {
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