import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [refresh, setRefresh] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const refreshTasks = () => {
    setRefresh(!refresh);
  };

  const clearEdit = () => {
    setEditTask(null);
  };

  return (
    <div
      className={`container py-5 ${darkMode ? "bg-dark text-light" : ""}`}
      style={{ minHeight: "100vh" }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div
            className={`card shadow-lg p-4 ${
              darkMode ? "bg-secondary text-light" : ""
            }`}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="text-primary">📋 Task Tracker</h1>

              <button
                className="btn btn-outline-primary"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>

            <TaskForm
              refreshTasks={refreshTasks}
              editTask={editTask}
              clearEdit={clearEdit}
            />

            <hr />

            <TaskList
              refresh={refresh}
              setEditTask={setEditTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;