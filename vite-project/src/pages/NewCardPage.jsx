import PopNewCard from "../components/popus/PopNewCard/PopNewCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewCardPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Design',
  });

  const handleClose = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    navigate('/');
  };

  return (
    <div>
      <PopNewCard
        formData={formData}
        setFormData={setFormData}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewCardPage;