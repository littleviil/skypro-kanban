import React, { useContext } from "react";
import { MainColumn, ColumnTitle } from "./Column.styled";
import { Cards } from "../Card/Card.styled";
import Card from "../Card/Card";
import { CardSkelet } from "../Card/CardSkelet.jsx";
import { TaskContext } from "../../context/TaskContext";

const Column = ({ status, onBrowseClick, tasks = [] }) => {
  const { loading } = useContext(TaskContext);

  const filteredTasks = tasks.filter(task => task && task.status === status);

  return (
    <MainColumn>
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
