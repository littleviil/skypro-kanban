import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PopNewCard from "../components/popus/PopNewCard/PopNewCard";

const NewCardPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Design",
    status: "Без статуса",
    date: new Date().toISOString(),
  });

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div>
      <PopNewCard
        formData={formData}
        setFormData={setFormData}
        onClose={handleClose}
      />
    </div>
  );
};

export default NewCardPage;