// Column.jsx
import React from "react";
import { Card } from "../Card/Card";
import { tasks } from "../../tasks";

export const Column = ({ status }) => {
  const filteredTasks = tasks.filter(task => task.status === status);

  return (
    <div className="main__column column">
      <div className="column__title">
        <p>{status}</p>
      </div>
      <div className="cards">
        {filteredTasks.map((task) => (
          <Card key={task.id} title={task.title} category={task.category} date={task.date} />
        ))}
      </div>
    </div>
  );
};