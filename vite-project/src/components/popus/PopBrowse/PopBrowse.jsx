import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '../../Calendar/Calendar';
import { taskCategories } from '../../../tasks';

const PopBrowse = ({ task, onClose }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/card/edit/${task.id}`);
  };

  const handleDelete = () => {
    onClose();
  };

  const taskCategoryColor = taskCategories[task?.category] || 'gray';

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3
                className="pop-browse__ttl"
              >
                Название задачи
              </h3>
              <div className={`categories__theme theme-top _${taskCategoryColor} _active-category`}>
                <p className={`_${taskCategoryColor}`}>{task?.category || 'Web Design'}</p>
              </div>
            </div>
            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                <div
                  className="status__theme"
                >
                  <p>{task?.status || 'Без статуса'}</p>
                </div>
              </div>
            </div>
            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse" id="formBrowseCard" action="#">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">Описание задачи</label>
                  <textarea
                    className="form-browse__area"
                    name="text"
                    id="textArea01"
                    readOnly
                    placeholder="Введите описание задачи..."
                    value={task?.description || ''}
                  ></textarea>
                </div>
              </form>
              <div className="pop-new-card__calendar calendar">
                <Calendar />
              </div>
            </div>
            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className={`categories__theme _${taskCategoryColor} _active-category`}>
                <p className={`_${taskCategoryColor}`}>{task?.category || 'Web Design'}</p>
              </div>
            </div>
            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                <button className="btn-browse__edit _btn-bor _hover03" onClick={handleEdit}>
                  Редактировать задачу
                </button>
                <button className="btn-browse__delete _btn-bor _hover03" onClick={handleDelete}>
                  Удалить задачу
                </button>
              </div>
              <button className="btn-browse__close _btn-bg _hover01" onClick={onClose}>
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