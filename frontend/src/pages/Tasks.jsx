import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tasks
  useEffect(() => {
    API.get("/tasks")
      .then(res => {
        setTasks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch projects
  useEffect(() => {
    API.get("/projects")
      .then(res => setProjects(res.data))
      .catch(() => {});
  }, []);

  const addTask = async () => {
    if (!title.trim()) return toast.error("Task title required");

    try {
      const res = await API.post("/tasks", {
        title,
        projectId: projectId || null,
      });

      setTasks([res.data, ...tasks]);
      setTitle("");
      setProjectId("");
      toast.success("Task added");
    } catch {
      toast.error("Something went wrong");
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await API.put(`/tasks/${id}`);
      setTasks(tasks.map(t => (t._id === id ? res.data : t)));
      toast.success("Task updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter(t => t._id !== id));
      toast.success("Task deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p style={{ opacity: 0.7 }}>Loading tasks...</p>;

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div>
      <h2>My Tasks</h2>

      {/* ➕ Add Task */}
      <div style={{ margin: "1rem 0" }}>
        <input
          placeholder="New task..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <select
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        >
          <option value="">No Project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

        <button onClick={addTask} style={{ marginLeft: "0.5rem" }}>
          Add
        </button>
      </div>

      {/* Pending */}
      <h3>Pending Tasks</h3>
      {pendingTasks.length === 0 && (
        <p style={{ opacity: 0.6 }}>No pending tasks</p>
      )}

      <div className="stats">
        {pendingTasks.map(task => (
          <div key={task._id} className="stat-card">
            <h4>{task.title}</h4>
            <button onClick={() => toggleTask(task._id)}>
              Mark completed
            </button>
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Completed */}
      <h3 style={{ marginTop: "2rem" }}>Completed Tasks</h3>
      {completedTasks.length === 0 && <p>No completed tasks</p>}

      <div className="stats">
        {completedTasks.map(task => (
          <div key={task._id} className="stat-card">
            <h4 style={{ textDecoration: "line-through" }}>
              {task.title}
            </h4>
            <button onClick={() => toggleTask(task._id)}>
              Mark pending
            </button>
            <button onClick={() => deleteTask(task._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
