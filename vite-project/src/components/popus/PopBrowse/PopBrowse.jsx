import React, { useState } from 'react';
import { Calendar } from '../../Calendar/Calendar';
import { taskCategories } from '../../../tasks';

const PopBrowse = ({ task, onClose }) => {
  const [editedTask, setEditedTask] = useState(task);

  const handleStatusChange = (status) => {
    setEditedTask((prev) => ({ ...prev, status }));
  };

  const handleDescriptionChange = (e) => {
    setEditedTask((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleDateChange = (newDate) => {
    if (!newDate) return;
    setEditedTask((prev) => ({
      ...prev,
      date: new Date(newDate).toISOString(), // формат для API
    }));
  };

  const handleSave = () => {
    console.log("Сохраняем", editedTask);
    // здесь отправляем PUT/PATCH запрос на API с editedTask
    onClose();
  };

  const handleDelete = () => {
    // здесь отправляем DELETE запрос на API
    onClose();
  };

  const taskCategoryColor = taskCategories[editedTask?.category] || 'gray';

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{editedTask?.title || 'Название задачи'}</h3>
              <div className={`categories__theme theme-top _${taskCategoryColor} _active-category`}>
                <p className={`_${taskCategoryColor}`}>{editedTask?.category || 'Web Design'}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {editedTask.status && (
                  <div
                    key={editedTask.status}
                    className="status__theme _active-status"
                    onClick={() => handleStatusChange(editedTask.status)}
                  >
                    <p>{editedTask.status}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">Описание задачи</label>
                  <textarea
                    className="form-browse__area"
                    name="description"
                    id="textArea01"
                    value={editedTask?.description || ''}
                    onChange={handleDescriptionChange}
                    placeholder="Введите описание задачи..."
                  ></textarea>
                </div>
              </form>

              {/* Привязанный календарь */}
              <div className="pop-new-card__calendar calendar">
                <Calendar
                  value={editedTask.date ? new Date(editedTask.date) : new Date()}
                  onChange={handleDateChange}
                />
              </div>
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className={`categories__theme _${taskCategoryColor} _active-category`}>
                <p className={`_${taskCategoryColor}`}>{editedTask?.category || 'Web Design'}</p>
              </div>
            </div>

            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn-browse__edit _btn-bor _hover03"
                  onClick={handleSave}
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  className="btn-browse__delete _btn-bor _hover03"
                  onClick={handleDelete}
                >
                  Удалить задачу
                </button>
              </div>
              <button
                type="button"
                className="btn-browse__close _btn-bg _hover01"
                onClick={onClose}
              >
                Закрыть
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PopBrowse;