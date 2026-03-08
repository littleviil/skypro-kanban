import { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Main from "../components/Main/Main";
import { TaskContext } from "../context/TaskContext";

function MainPage() {
  const navigate = useNavigate();
  const { tasks, fetchTasks, error } = useContext(TaskContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const openTaskEdit = (task) => navigate(`/card/${task._id ?? task.id}`);

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <Main tasks={tasks} onBrowseClick={openTaskEdit} />
      <Outlet />
    </div>
  );
}

export default MainPage;