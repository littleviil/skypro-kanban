// pages/NewCardPage.jsx
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
    category: "Web Design",
    status: "Без статуса",
    date: new Date().toISOString(),
  });

  const handleClose = () => navigate("/");

  const handleSubmit = async () => {
    await addTask(formData);
    navigate("/"); // возврат на главную
  };

  return (
    <PopNewCard
      formData={formData}
      setFormData={setFormData}
      onClose={handleClose}
      onSubmit={handleSubmit}
    />
  );
};

export default NewCardPage;
