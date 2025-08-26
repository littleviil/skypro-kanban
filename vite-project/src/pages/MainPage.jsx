import { useState, useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PopExit from "../components/popus/PopExit/PopExit";
import PopBrowse from "../components/popus/PopBrowse/PopBrowse";
import { Container, Loading } from "../App.styled";
import Main from "../components/Main/Main";
import { TaskContext } from "../context/TaskContext";

function MainPage() {
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
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

  const openPopBrowse = (task) => {
    setSelectedTask(task);
    setIsPopBrowseOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/login");
  };

  if (initialLoading) return <Loading>Данные загружаются...</Loading>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {isPopExitOpen && (
        <PopExit onClose={() => setIsPopExitOpen(false)} onLogout={handleLogout} />
      )}
      {isPopBrowseOpen && selectedTask && (
        <PopBrowse
          task={selectedTask}
          onClose={() => {
            setIsPopBrowseOpen(false);
            setSelectedTask(null);
          }}
        />
      )}

      <Container>
        <Main tasks={tasks} onBrowseClick={openPopBrowse} />
        <Outlet />
      </Container>
    </>
  );
}

export default MainPage;
