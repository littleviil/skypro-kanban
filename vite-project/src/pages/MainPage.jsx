import { useEffect, useState, useContext } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PopExit from "../components/popus/PopExit/PopExit";
import PopBrowse from "../components/popus/PopBrowse/PopBrowse";
import { Container, Loading } from "../App.styled";
import Main from "../components/Main/Main";
import { TaskContext } from "../context/TaskContext";
import { fetchKanbanTasks } from "../services/api";

function MainPage() {
  const [loading, setLoading] = useState(true);
  const [isPopExitOpen, setIsPopExitOpen] = useState(false);
  const [isPopBrowseOpen, setIsPopBrowseOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { tasks, setTasks } = useContext(TaskContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      (async () => {
        try {
          setLoading(true);
          const newTasks = await fetchKanbanTasks(token);
          setTasks(Array.isArray(newTasks) ? newTasks : newTasks.tasks || []);
          setError("");
        } catch (err) {
          console.error("Error loading tasks:", err);
          setError("Не удалось загрузить задачи");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [token, navigate, setTasks]);

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

      {loading ? (
        <Loading>Данные загружаются...</Loading>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <Container>
          <Main tasks={tasks} onBrowseClick={openPopBrowse} />
          <Outlet />
        </Container>
      )}
    </>
  );
}

export default MainPage;