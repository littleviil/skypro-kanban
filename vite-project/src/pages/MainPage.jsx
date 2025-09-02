import { useState, useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Main from "../components/Main/Main";
import { TaskContext } from "../context/TaskContext";

function MainPage() {
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();
  const { tasks, error, refreshTasks } = useContext(TaskContext);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    refreshTasks().finally(() => setInitialLoading(false));
  }, [token, navigate, refreshTasks]);

  const openTaskEdit = (task) => {
    navigate(`/card/${task.id || task._id}`);
  };

  if (initialLoading) return <div className="loading">Данные загружаются...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <Main tasks={tasks} onBrowseClick={openTaskEdit} />
      <Outlet />
    </div>
  );
}

export default MainPage;
