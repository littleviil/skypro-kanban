import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopBrowse from "../components/popus/PopBrowse/PopBrowse";
import { TaskContext } from "../context/TaskContext";

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const task = tasks.find(
      (task) =>
        String(task.id) === String(id) || String(task._id) === String(id)
    );
    if (task) {
      setSelectedTask(task);
    } else {
      navigate("/");
    }
  }, [id, tasks, navigate]);

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div>
      <PopBrowse task={selectedTask} onClose={handleClose} isEditMode={true} />
    </div>
  );
};

export default EditCardPage;