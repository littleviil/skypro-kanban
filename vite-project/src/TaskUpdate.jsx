import { createContext, useContext, useState } from 'react';

const TaskUpdate = createContext();

export const TaskProvider = ({ children, refreshTasks: initialRefreshTasks }) => {
  const [refreshTasks] = useState(initialRefreshTasks);

  return (
    <TaskUpdate.Provider value={{ refreshTasks }}>
      {children}
    </TaskUpdate.Provider>
  );
};

export const useTaskUpdate = () => useContext(TaskUpdate);