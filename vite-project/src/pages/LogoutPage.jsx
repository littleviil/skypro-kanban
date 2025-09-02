import PopExit from "../components/popus/PopExit/PopExit";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { TaskContext } from "../context/TaskContext";

const ExitPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { clearTasks } = useContext(TaskContext);

  const handleClose = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    clearTasks();
    navigate("/login");
  };

  return (
    <PopExit isOpen={true} onClose={handleClose} onLogout={handleLogout} />
  );
};

export default ExitPage;