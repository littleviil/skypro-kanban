import React from "react";
import { Calendar } from "../../Calendar/Calendar";
import { taskCategories } from "../../../tasks";
import { createKanbanTask } from "../../../services/api";

const PopNewCard = ({
  formData,
  setFormData,
  onClose,
  refreshTasks,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySelect = (category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        status: formData.status,
        date: new Date(formData.date || Date.now()).toISOString(),
      };

      await createKanbanTask(payload);
      if (refreshTasks) {
        await refreshTasks();
      }
      onClose();
    } catch (error) {
      console.error("Ошибка создания задачи:", error.message || error);
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
                  />
                </div>
              </form>

              <div className="pop-new-card__calendar calendar">
                <Calendar />
              </div>
            </div>

            <div className="pop-new-card__categories categories">
              <p className="categories__p subttl">Категория</p>
              <div className="categories__themes">
                {Object.keys(taskCategories).map((category) => (
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
              className="form-new__create _hover01"
              id="btnCreate"
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