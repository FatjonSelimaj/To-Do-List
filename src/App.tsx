import React, { useState } from "react";
import { Task } from "./types/Task";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, description?: string) => {
    const newTask: Task = {
      id: `${Date.now()}`,
      title,
      description,
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Gestione Attività</h1>
      <TaskForm onAddTask={addTask} />
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} />
      ))}
    </div>
  );
};

export default App;
