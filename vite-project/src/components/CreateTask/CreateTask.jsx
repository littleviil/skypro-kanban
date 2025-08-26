import React, { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";
import { Calendar } from "../Calendar/Calendar";

const CreateTask = ({ onCreated }) => {
  const { addTask, STATUS_UI, CATEGORY_UI } = useContext(TaskContext);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: STATUS_UI.TODO,
    category: "Web Design",
    date: new Date(),
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onDateChange = (newDate) => {
    if (!newDate) return;
    setForm((prev) => ({ ...prev, date: newDate }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("Введите название задачи");
      return;
    }
    if (!form.description.trim()) {
      setError("Введите описание задачи");
      return;
    }

    try {
      setError("");

      await addTask({
        title: form.title.trim(),
        description: form.description.trim(),
        status: form.status,
        category: form.category,
        date: form.date instanceof Date ? form.date.toISOString() : form.date,
      });

      setForm({
        title: "",
        description: "",
        status: STATUS_UI.TODO,
        category: "Web Design",
        date: new Date(),
      });

      if (typeof onCreated === "function") onCreated();
    } catch (err) {
      console.error("Ошибка создания задачи:", err);
      setError(err.message || "Не удалось создать задачу");
    }
  };

  return (
    <div className="create-task">
      <form onSubmit={onSubmit} className="create-task__form">
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="form-field">
          <label className="subttl">Заголовок</label>
          <input
            name="title"
            type="text"
            className="form-input"
            placeholder="Введите название задачи"
            value={form.title}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-field mt-8">
          <label className="subttl">Описание</label>
          <textarea
            name="description"
            className="form-textarea"
            placeholder="Введите описание задачи"
            value={form.description}
            onChange={onChange}
            required
          />
        </div>

        <div className="form-grid mt-8">
          <div className="form-field">
            <label className="subttl">Статус</label>
            <select
              name="status"
              className="form-select"
              value={form.status}
              onChange={onChange}
            >
              {Object.values(STATUS_UI).map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label className="subttl">Категория</label>
            <select
              name="category"
              className="form-select"
              value={form.category}
              onChange={onChange}
            >
              {CATEGORY_UI.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-field mt-8">
          <label className="subttl">Дата</label>
          <div className="calendar-wrap">
            <Calendar value={form.date} onChange={onDateChange} />
          </div>
        </div>

        <div className="mt-12">
          <button type="submit" className="_btn-bg _hover01">
            Создать задачу
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;