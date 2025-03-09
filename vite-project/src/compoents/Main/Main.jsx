import React from "react";
import { Column } from "../Column/Column";

export const Main = () => {
  const statuses = ["Без статуса", "Нужно сделать", "В работе", "Тестирование", "Готово"];

  return (
    <main className="main">
      <div className="container">
        <div className="main__block">
          {statuses.map((status, index) => (
            <Column key={index} status={status} />
          ))}
        </div>
      </div>
    </main>
  );
};