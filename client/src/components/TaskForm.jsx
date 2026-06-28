import { useState, useEffect } from "react";
import API from "../services/api";

function TaskForm({ refreshTasks, editTask, clearEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editTask) {
        await API.put(`/tasks/${editTask._id}`, {
          title,
          description,
          status: editTask.status,
        });

        alert("Task Updated Successfully!");
        clearEdit();
      } else {
        await API.post("/tasks", {
          title,
          description,
          status: "Pending",
        });

        alert("Task Added Successfully!");
      }

      setTitle("");
      setDescription("");
      refreshTasks();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3 className="mb-3">
        {editTask ? "✏️ Edit Task" : "➕ Add Task"}
      </h3>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="form-control mb-3"
        rows="4"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button type="submit" className="btn btn-primary w-100">
        {editTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;