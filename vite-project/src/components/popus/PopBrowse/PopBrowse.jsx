import React, { useContext, useEffect, useMemo, useState } from "react";
import { Calendar } from "../../Calendar/Calendar";
import { TaskContext } from "../../../context/TaskContext";
import { taskCategories } from "../../../tasks";

const getId = (t) => (t?.id ?? t?._id);
const sameId = (a, b) => String(a) === String(b);

const PopBrowse = ({ task, onClose }) => {
  const { editTask, removeTask, STATUS_UI, tasks } = useContext(TaskContext);
  const taskId = useMemo(() => getId(task), [task]);

  const [isEditing, setIsEditing] = useState(false);
  const [viewTask, setViewTask] = useState(task);
  const [draft, setDraft] = useState(task);

  useEffect(() => {
    const fresh = tasks.find((t) => sameId(getId(t), taskId));
    if (fresh) {
      setViewTask(fresh);
      if (!isEditing) setDraft(fresh);
    }
  }, [tasks, taskId, isEditing]);

  useEffect(() => {
    console.log("[PB] opened", { id: taskId, view: viewTask });
  }, [taskId, viewTask]);

  const startEdit = () => {
    setDraft(viewTask);
    setIsEditing(true);
    console.log("[PB] startEdit", viewTask);
  };

  const handleCancel = () => {
    setDraft(viewTask);
    setIsEditing(false);
    console.log("[PB] cancel ->", viewTask);
  };

  const updateDraft = (field, value) => {
    setDraft((p) => ({ ...p, [field]: value }));
  };

  const handleSave = async () => {
    try {
      console.time("[PB] save");
      const updated = await editTask(taskId, draft);
      if (updated) {
        setViewTask(updated);
        setDraft(updated);
      }
      setIsEditing(false);
      console.log("[PB] saved", { id: taskId, updated });
      console.timeEnd("[PB] save");
    } catch (err) {
      console.error("[PB] save error", err);
    }
  };

  const handleDelete = async () => {
    try {
      await removeTask(taskId);
      onClose();
    } catch (err) {
      console.error("[PB] delete error", err);
    }
  };

  const taskCategoryColor = taskCategories[viewTask?.topic?.replace(/\b\w/g, c => c.toUpperCase())] || "gray";

  return (
    <div className="pop-browse" id="popBrowse">
      <div className="pop-browse__container">
        <div className="pop-browse__block">
          <div className="pop-browse__content">
            <div className="pop-browse__top-block">
              <h3 className="pop-browse__ttl">{viewTask?.title || "Название задачи"}</h3>
              <div className={`categories__theme theme-top _${taskCategoryColor} _active-category`}>
                <p className={`_${taskCategoryColor}`}>{viewTask?.topic || "Без категории"}</p>
              </div>
            </div>

            <div className="pop-browse__status status">
              <p className="status__p subttl">Статус</p>
              <div className="status__themes">
                {isEditing ? (
                  Object.values(STATUS_UI).map((st) => {
                    const active = draft.status === st;
                    return (
                      <div
                        key={st}
                          className={`status__theme ${active ? "_active" : ""}`}
                        onClick={() => updateDraft("status", st)}
                      >
                        <p>{st}</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="status__theme _active">
                    <p>{viewTask?.status || STATUS_UI.NO_STATUS}</p>
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
                    value={(isEditing ? draft?.description : viewTask?.description) || ""}
                    onChange={(e) => updateDraft("description", e.target.value)}
                    placeholder="Введите описание задачи..."
                    disabled={!isEditing}
                  />
                </div>
              </form>

              <div className="pop-new-card__calendar calendar">
                <Calendar
                  value={
                    (isEditing ? draft?.date : viewTask?.date)
                      ? new Date(isEditing ? draft.date : viewTask.date)
                      : new Date()
                  }
                  onChange={isEditing ? (d) => updateDraft("date", new Date(d)) : undefined}
                />
              </div>
            </div>

            <div className="theme-down__categories theme-down">
              <p className="categories__p subttl">Категория</p>
              <div className={`categories__theme _${taskCategoryColor} _active-category`}>
                <p className={`_${taskCategoryColor}`}>{viewTask?.topic || "Без категории"}</p>
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
