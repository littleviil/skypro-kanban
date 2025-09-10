import React, { useState } from "react";
import { Calendar } from "../../Calendar/Calendar";
import { taskCategories } from "../../../tasks";

const PopNewCard = ({ formData, setFormData, onClose, onSubmit }) => {
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (topic) => {
    setFormData((prev) => ({ ...prev, topic }));
  };

  const handleDateChange = (date) => {
    if (!date) return;
    setFormData((prev) => ({ ...prev, date: new Date(date).toISOString() }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError("Введите название задачи");
      return;
    }
    if (!formData.description.trim()) {
      setError("Введите описание задачи");
      return;
    }
    setError("");
    onSubmit();
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
              <form className="pop-new-card__form form-new" onSubmit={handleSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="form-new__block">
                  <label htmlFor="formTitle" className="subttl">Название задачи</label>
                  <input
                    className="form-new__input"
                    type="text"
                    name="title"
                    id="formTitle"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Введите название задачи..."
                    required
                  />
                </div>

                <div className="form-new__block">
                  <label htmlFor="textArea" className="subttl">Описание задачи</label>
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
                <Calendar
                  value={formData.date ? new Date(formData.date) : new Date()}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                {Object.keys(taskCategories).map((cat) => (
                  <div
                    key={cat}
                    className={`categories__theme _${taskCategories[cat]} ${
                      formData.topic === cat ? "_active-category" : ""
                    }`}
                    onClick={() => handleCategorySelect(cat)}
                  >
                    <p className={`_${taskCategories[cat]}`}>{cat}</p>
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
