import React from "react";
import { Task } from "../types/Task";

interface TaskCardProps {
    task: Task;
    onToggleComplete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete }) => {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#fff",
            }}
        >
            <h3 style={{ margin: "0 0 10px", color: "#333" }}>{task.title}</h3>
            <p style={{ margin: "0 0 10px", color: "#555" }}>{task.description}</p>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onToggleComplete(task.id)} // Assicurati che `task.id` sia corretto
                />

                <span style={{ color: task.completed ? "#0a7b0a" : "#333" }}>
                    {task.completed ? "Completata" : "Non completata"}
                </span>
            </label>
        </div>
    );
};

export default TaskCard;
