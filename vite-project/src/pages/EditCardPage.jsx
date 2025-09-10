import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopBrowse from "../components/popus/PopBrowse/PopBrowse";
import { TaskContext } from "../context/TaskContext";

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, fetchTasks } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      if (!tasks || tasks.length === 0) {
        await fetchTasks();
      }
      const task = (tasks || []).find(
        t => String(t._id ?? t.id) === String(id)
      );
      if (task) {
        setSelectedTask(task);
      } else {
        navigate("/"); // если задача не найдена
      }
      setLoading(false);
    };

    loadTask();
  }, [id, tasks, fetchTasks, navigate]);

  const handleClose = () => navigate("/");

  const handleTaskUpdate = async () => {
    await fetchTasks(); // обновляем задачи после редактирования
    navigate("/");
  };

  if (loading || !selectedTask) return null; // не рендерим пока задача не загружена

  return (
    <div>
      <PopBrowse
        task={selectedTask}
        onClose={handleClose}
        onTaskUpdate={handleTaskUpdate}
      />
    </div>
  );
};

export default EditCardPage;
