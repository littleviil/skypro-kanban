import PopBrowse from "../components/popus/PopBrowse/PopBrowse";
import { useParams, useNavigate } from "react-router-dom";
import { tasks } from '../tasks';

const EditCardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((task) => task.id === parseInt(id));

  const handleClose = () => {
    navigate(-1);
  };

  if (!task) {
    return <div>Задача не найдена</div>;
  }

  return (
    <div>
      <p>ID карточки: {id}</p>
      <PopBrowse
        task={task}
        onClose={handleClose}
      />
    </div>
  );
};

export default EditCardPage;