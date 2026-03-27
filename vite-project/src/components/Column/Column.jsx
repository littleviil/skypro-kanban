import React, { useContext } from "react";
import { MainColumn, ColumnTitle } from "./Column.styled";
import { Cards } from "../Card/Card.styled";
import Card from "../Card/Card";
import { CardSkelet } from "../Card/CardSkelet.jsx";
import { TaskContext } from "../../context/TaskContext";

const Column = ({ status, onBrowseClick, tasks = [] }) => {
  const { loading, updateTask } = useContext(TaskContext);

  const filteredTasks = tasks.filter(task => task && task.status === status);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const fromStatus = e.dataTransfer.getData("taskStatus");
    const taskExists = tasks.some((t) => (t._id ?? t.id) === taskId);
    if (taskId && taskExists && fromStatus !== status) {
      updateTask(taskId, { status });
    }
  };

  return (
    <MainColumn
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ColumnTitle><p>{status}</p></ColumnTitle>
      <Cards>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <CardSkelet key={i} />)
          : filteredTasks.map((task, index) => (
              <Card key={task._id ?? index} task={task} onBrowseClick={onBrowseClick} />
            ))}
      </Cards>
    </MainColumn>
  );
};

export default Column;
