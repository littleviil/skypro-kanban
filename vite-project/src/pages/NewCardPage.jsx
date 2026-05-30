import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PopNewCard from "../components/popus/PopNewCard/PopNewCard";
import { TaskContext } from "../context/TaskContext";

const NewCardPage = () => {
  const navigate = useNavigate();
  const { addTask } = useContext(TaskContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "Web Design",
    status: "Без статуса",
    date: new Date().toISOString(),
  });
  const [error, setError] = useState("");

  const handleClose = () => navigate("/");

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      setError("Введите название задачи");
      return;
    }
    if (!formData.description.trim()) {
      setError("Введите описание задачи");
      return;
    }
    setError("");

    try {
      await addTask(formData);
    } catch (err) {
      setError(err.message || "Ошибка создания задачи");
    }
  };

  return (
    <PopNewCard
      formData={formData}
      setFormData={setFormData}
      onClose={handleClose}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default NewCardPage;
