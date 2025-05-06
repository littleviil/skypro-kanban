import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from '../../Calendar/Calendar';

const PopBrowse = ({ task, onClose }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/card/edit/${task.id}`);
  };

  const handleDelete = () => {
    console.log('Удаление задачи:', task.id);
    onClose();
  };

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{task?.title || 'Название задачи'}</h3>
              <div className={`categories__theme theme-top _${task?.category?.toLowerCase() || 'orange'} _active-category`}>
                <p className={`_${task?.category?.toLowerCase() || 'orange'}`}>{task?.category || 'Web Design'}</p>
              </div>
            </div>
            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                <div className={`status__theme ${task?.status === 'Без статуса' ? '' : '_hide'}`}>
                  <p>Без статуса</p>
                </div>
                <div className={`status__theme ${task?.status === 'Нужно сделать' ? '_gray' : '_hide'}`}>
                  <p className="_gray">Нужно сделать</p>
                </div>
                <div className={`status__theme ${task?.status === 'В работе' ? '' : '_hide'}`}>
                  <p>В работе</p>
                </div>
                <div className={`status__theme ${task?.status === 'Тестирование' ? '' : '_hide'}`}>
                  <p>Тестирование</p>
                </div>
                <div className={`status__theme ${task?.status === 'Готово' ? '' : '_hide'}`}>
                  <p>Готово</p>
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
              <div className={`categories__theme _${task?.category?.toLowerCase() || 'orange'} _active-category`}>
                <p className={`_${task?.category?.toLowerCase() || 'orange'}`}>{task?.category || 'Web Design'}</p>
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