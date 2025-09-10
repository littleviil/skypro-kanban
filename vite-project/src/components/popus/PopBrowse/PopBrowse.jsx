import React, { useState, useEffect, useContext } from "react";
import { Calendar } from "../../Calendar/Calendar";
import { TaskContext } from "../../../context/TaskContext";
import { taskCategories, statusThemes } from "../../../tasks";

const PopBrowse = ({ task, onClose }) => {
  const { updateTask, removeTask } = useContext(TaskContext);

  const [draft, setDraft] = useState({
    title: "",
    description: "",
    status: "Без статуса",
    topic: "Web Design",
    date: new Date().toISOString(),
    ...task,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (task) {
      setDraft({
        title: "",
        description: "",
        status: "Без статуса",
        topic: "Web Design",
        date: new Date().toISOString(),
        ...task,
      });
    }
  }, [task]);

  const updateDraft = (field, value) =>
    setDraft((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    try {
      await updateTask(task._id ?? task.id, draft);
      setIsEditing(false);
    } catch (err) {
      console.error("Ошибка сохранения задачи:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await removeTask(task._id ?? task.id);
      onClose();
    } catch (err) {
      console.error("Ошибка удаления задачи:", err);
    }
  };

  const categoryColor = taskCategories[draft.topic] || "gray";

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            {/* Заголовок и категория */}
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">
                {draft.title || "Название задачи"}
              </h3>
              <div
                className={`categories__theme theme-top _${categoryColor} _active-category`}
              >
                <p className={`_${categoryColor}`}>{draft.topic}</p>
              </div>
            </div>

            {/* Статус */}
            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {isEditing
                  ? Object.keys(statusThemes).map((st) => (
                      <div
                        key={st}
                        className={`status__theme ${
                          draft.status === st ? "_active" : ""
                        }`}
                        onClick={() => updateDraft("status", st)}
                      >
                        <p>{st}</p>
                      </div>
                    ))
                  : (
                    <div className="status__theme _active">
                      <p>{draft.status}</p>
                    </div>
                  )}
              </div>
            </div>

            {/* Описание + календарь */}
            <div className="pop-browse__wrap">
              <form className="pop-browse__form form-browse">
                <div className="form-browse__block">
                  <label htmlFor="textArea01" className="subttl">
                    Описание задачи
                  </label>
                  <textarea
                    className="form-browse__area"
                    id="textArea01"
                    value={draft.description || ""}
                    onChange={(e) =>
                      updateDraft("description", e.target.value)
                    }
                    placeholder="Введите описание задачи..."
                    disabled={!isEditing}
                  />
                </div>
              </form>
              <div className="pop-new-card__calendar calendar">
                <Calendar
                  value={draft.date ? new Date(draft.date) : new Date()}
                  onChange={
                    isEditing
                      ? (d) =>
                          updateDraft("date", new Date(d).toISOString())
                      : undefined
                  }
                />
              </div>
            </div>

            {/* Кнопки */}
            <div className="pop-browse__btn-browse">
              <div className="btn-group">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      className="btn-browse__edit _btn-bor _hover03"
                      onClick={handleSave}
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      className="btn-browse__edit _btn-bor _hover03"
                      onClick={() => {
                        setDraft({ ...task });
                        setIsEditing(false);
                      }}
                    >
                      Отменить
                    </button>
                    <button
                      type="button"
                      className="btn-browse__delete _btn-bor _hover03"
                      onClick={handleDelete}
                    >
                      Удалить задачу
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn-browse__edit _btn-bor _hover03"
                      onClick={() => setIsEditing(true)}
                    >
                      Редактировать задачу
                    </button>
                    <button
                      type="button"
                      className="btn-browse__delete _btn-bor _hover03"
                      onClick={handleDelete}
                    >
                      Удалить задачу
                    </button>
                  </>
                )}
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
