import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskCard from "./components/TaskCard";
import { Task } from "./types/Task";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Recupera tutte le attività dal backend
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
      if (!response.ok) {
        throw new Error("Errore durante il recupero delle attività");
      }
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  // Aggiungi una nuova attività
  const onAddTask = async (title: string, description?: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error("Errore nella creazione dell'attività");
      }

      const task = await response.json();
      setTasks((prevTasks) => [...prevTasks, task]); // Aggiungi la nuova attività alla lista
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  // Aggiorna lo stato di completamento
  const onToggleComplete = async (id: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento dello stato di completamento");
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, completed: true } : task
        )
      );
    } catch (error) {
      console.error("Errore:", error);
    }
  };


  // Recupera le attività al caricamento del componente
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Gestione delle Attività</h1>
      <TaskForm onAddTask={onAddTask} />
      <div style={{ marginTop: "20px" }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggleComplete={onToggleComplete} />
        ))}
      </div>
    </div>
  );
};

export default App;
