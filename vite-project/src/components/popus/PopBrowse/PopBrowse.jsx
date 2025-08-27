import React, { useContext, useState, useEffect } from "react";
import { Calendar } from "../../Calendar/Calendar";
import { TaskContext } from "../../../context/TaskContext";
import { taskCategories } from "../../../tasks";

const PopBrowse = ({ task, onClose }) => {
  const { editTask, removeTask, STATUS_UI } = useContext(TaskContext);

  const [isEditing, setIsEditing] = useState(false);
  const [viewTask, setViewTask] = useState(task);
  const [draft, setDraft] = useState(task);

  const taskId = task?.id ?? task?._id;
  // console.log("Deleting taskId:", taskId);

  useEffect(() => {
    setViewTask(task);
    setDraft(task);
  }, [task]);

  const startEdit = () => {
    setDraft(viewTask);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(viewTask);
    setIsEditing(false);
  };

  const updateDraft = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const updated = await editTask(taskId, draft);
      if (updated) {
        setViewTask(updated);
        setDraft(updated);
      }
      setIsEditing(false);
    } catch (err) {
      console.error("Ошибка сохранения задачи:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await removeTask(taskId);
      onClose();
    } catch (err) {
      console.error("Ошибка удаления задачи:", err);
    }
  };

  const taskCategory = draft?.categoryUi || viewTask?.categoryUi || "Без категории";
  const categoryColor = taskCategories[taskCategory] || "gray";

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{viewTask?.title || "Название задачи"}</h3>
              <div className={`categories__theme theme-top _${categoryColor} _active-category`}>
                <p className={`_${categoryColor}`}>{taskCategory}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {isEditing
                  ? Object.values(STATUS_UI).map((st) => {
                      const active = draft.statusUi === st;
                      return (
                        <div
                          key={st}
                          className={`status__theme ${active ? "_active" : ""}`}
                          onClick={() => updateDraft("statusUi", st)}
                        >
                          <p>{st}</p>
                        </div>
                      );
                    })
                  : (
                    <div className="status__theme _active">
                      <p>{viewTask?.statusUi || STATUS_UI.NO_STATUS}</p>
                    </div>
                  )}
              </div>
            </div>

            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">Описание задачи</label>
                  <textarea
                    className="form-browse__area"
                    id="textArea01"
                    value={(isEditing ? draft.description : viewTask.description) || ""}
                    onChange={(e) => updateDraft("description", e.target.value)}
                    placeholder="Введите описание задачи..."
                    disabled={!isEditing}
                  />
                </div>
              </form>

              <div className="pop-new-card__calendar calendar">
                <Calendar
                  value={isEditing ? draft.date : viewTask.date ? new Date(viewTask.date) : new Date()}
                  onChange={isEditing ? (d) => updateDraft("date", new Date(d)) : undefined}
                />
              </div>
            </div>

            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                {isEditing ? (
                  <>
                    <button type="button" className="btn-browse__edit _btn-bor _hover03" onClick={handleSave}>
                      Сохранить
                    </button>
                    <button type="button" className="btn-browse__edit _btn-bor _hover03" onClick={handleCancel}>
                      Отменить
                    </button>
                    <button type="button" className="btn-browse__delete _btn-bor _hover03" onClick={handleDelete}>
                      Удалить задачу
                    </button>
                  </>
                ) : (
                  <>
                    <button type="button" className="btn-browse__edit _btn-bor _hover03" onClick={startEdit}>
                      Редактировать задачу
                    </button>
                    <button type="button" className="btn-browse__delete _btn-bor _hover03" onClick={handleDelete}>
                      Удалить задачу
                    </button>
                  </>
                )}
              </div>
              <button type="button" className="btn-browse__close _btn-bg _hover01" onClick={onClose}>
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
