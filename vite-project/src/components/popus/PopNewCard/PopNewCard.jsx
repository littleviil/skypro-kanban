import React, { useState, useContext } from "react";
import { Calendar } from "../../Calendar/Calendar";
import { taskCategories } from "../../../tasks";
import { TaskContext } from "../../../context/TaskContext";

const PopNewCard = ({ onClose }) => {
  const { addTask, STATUS_UI, CATEGORY_UI } = useContext(TaskContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: STATUS_UI.TODO,
    category: CATEGORY_UI[0],
    date: new Date(),
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleDateChange = (date) => {
    if (!date) return;
    setFormData((prev) => ({ ...prev, date: new Date(date) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("Введите название задачи");
      return;
    }
    if (!formData.description.trim()) {
      setError("Введите описание задачи");
      return;
    }

    try {
      setError("");

      const newTaskUi = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        category: formData.category,
        date: formData.date,
      };

      await addTask(newTaskUi);
      onClose();
    } catch (err) {
      console.error("Ошибка создания задачи:", err);
      setError(err.message || "Не удалось создать задачу");
    }
  };

  return (
    <div className="pop-new-card" id="popNewCard">
      <div className="pop-new-card__container">
        <div className="pop-new-card__block">
          <div className="pop-new-card__content">
            <h3 className="pop-new-card__ttl">Создание задачи</h3>
            <a
              href="#"
              className="pop-new-card__close"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              ✕
            </a>

            <div className="pop-new-card__wrap">
              <form
                className="pop-new-card__form form-new"
                id="formNewCard"
                onSubmit={handleSubmit}
              >
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">
                    Название задачи
                  </label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="title"
                    id="formTitle"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Введите название задачи..."
                    autoFocus
                    required
                  />
                </div>

                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-new__area"
                    name="description"
                    id="textArea"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Введите описание задачи..."
                    required
                  />
                </div>
              </form>

              <div className="pop-new-card__calendar calendar">
                <Calendar value={formData.date} onChange={handleDateChange} />
              </div>
            </div>

            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                {CATEGORY_UI.map((category) => (
                  <div
                    key={category}
                    className={`categories__theme _${taskCategories[category]} ${
                      formData.category === category ? "_active-category" : ""
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <p className={`_${taskCategories[category]}`}>{category}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="form-new__create _hover01"
              onClick={handleSubmit}
            >
              Создать задачу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopNewCard;
