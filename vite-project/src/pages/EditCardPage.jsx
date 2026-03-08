import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PopBrowse from "../components/popus/PopBrowse/PopBrowse";
import { TaskContext } from "../context/TaskContext";

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useContext(TaskContext);

  const task = (tasks || []).find(
    (t) => t && String(t._id ?? t.id) === String(id)
  );

  const handleClose = () => navigate("/");

  return (
    <PopBrowse
      task={task}
      onClose={handleClose}
    />
  );
};

export default EditCardPage;
