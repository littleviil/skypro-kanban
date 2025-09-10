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
    const taskFound = (tasks || []).find(
      t => t && String(t._id ?? t.id) === String(id)
    );

    if (taskFound) {
      setSelectedTask(taskFound);
    } else {
      navigate("/");
    }
  }, [id, tasks, navigate]);

  const handleClose = () => navigate("/");

  if (!selectedTask) return null;

  return (
    <PopBrowse
      task={selectedTask}
      onClose={handleClose}
    />
  );
};

export default EditCardPage;
