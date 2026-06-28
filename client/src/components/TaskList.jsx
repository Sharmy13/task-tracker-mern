import { useEffect, useState } from "react";
import API from "../services/api";

function TaskList({ refresh, setEditTask, search }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [refresh]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      alert("Task Deleted Successfully!");
      fetchTasks();
    } catch (error) {
      console.error(error);
      alert("Error deleting task");
    }
  };
  const filteredTasks = tasks.filter((task) =>
  task.title.toLowerCase().includes((search || "").toLowerCase())
);
return (
  <div>

    <h3 className="mb-3">📌 My Tasks</h3>

    {tasks.length === 0 ? (
      <div className="alert alert-warning">
        No Tasks Found
      </div>
    ) : (
      filteredTasks.map((task) => (
        <div
          key={task._id}
          className="card mb-3 shadow-sm"
        >
          <div className="card-body">

            <h5>{task.title}</h5>

            <p>{task.description}</p>

            <span
              className={
                task.status === "Completed"
                  ? "badge bg-success"
                  : "badge bg-warning text-dark"
              }
            >
              {task.status}
            </span>

            <div className="mt-3">

              <button
                className="btn btn-success me-2"
                onClick={() => setEditTask(task)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteTask(task._id)}
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      ))
    )}

  </div>
);
}

export default TaskList;