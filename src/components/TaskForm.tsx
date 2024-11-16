import React, { useState } from "react";

interface TaskFormProps {
    onAddTask: (title: string, description?: string) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask(title, description);
            setTitle("");
            setDescription("");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
                backgroundColor: "#f9f9f9",
                padding: "15px",
                borderRadius: "10px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
        >
            <input
                type="text"
                placeholder="Titolo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                }}
            />
            <textarea
                placeholder="Descrizione (opzionale)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{
                    padding: "10px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    minHeight: "80px",
                }}
            />
            <button
                type="submit"
                style={{
                    padding: "10px 15px",
                    fontSize: "16px",
                    borderRadius: "8px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Aggiungi Attività
            </button>
        </form>
    );
};

export default TaskForm;
