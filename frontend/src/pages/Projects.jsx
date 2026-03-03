import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");

  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    API.get("/projects")
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load projects");
        setLoading(false);
      });
  }, []);

  const addProject = async () => {
    if (!projectTitle.trim()) return toast.error("Title required");

    try {
      const res = await API.post("/projects", {
        title: projectTitle,
        description: projectDescription,
      });

      setProjects([res.data, ...projects]);
      setProjectTitle("");
      setProjectDescription("");
      toast.success("Project added");
    } catch {
      toast.error("Project creation failed");
    }
  };

  const openProject = async (project) => {
    setSelectedProject(project);
    setTaskTitle("");

    try {
      const res = await API.get(`/tasks/project/${project._id}`);
      setTasks(res.data);
    } catch {
      toast.error("Failed to load project tasks");
    }
  };

  const addTaskToProject = async () => {
    if (!taskTitle.trim()) return toast.error("Task title required");

    try {
      const res = await API.post("/tasks", {
        title: taskTitle,
        projectId: selectedProject._id,
      });

      setTasks([res.data, ...tasks]);
      setTaskTitle("");
      toast.success("Task added");
    } catch {
      toast.error("Task creation failed");
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

  if (loading) {
    return <p style={{ opacity: 0.7 }}>Loading projects...</p>;
  }

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div>
      <h2>Projects</h2><br/><br/>

      {/* ➕ Create Project */}
      <div className="stat-card" style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Project title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
        <button onClick={addProject}>➕ Add Project</button>
      </div>

      {/* 📦 Project List */}
      <div className="stats">
        {projects.map((project) => (
          <div
            key={project._id}
            className="stat-card"
            onClick={() => openProject(project)}
            style={{
              cursor: "pointer",
              border:
                selectedProject?._id === project._id
                  ? "2px solid var(--primary)"
                  : "1px solid #ddd",
            }}
          >
            <h4>{project.title}</h4>
            <p>{project.description || "No description"}</p>
          </div>
        ))}
      </div>

      {/* 📌 Selected Project */}
      {selectedProject && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Tasks for: {selectedProject.title}</h3>

          {/* ➕ Add Task */}
          <div className="stat-card" style={{ marginBottom: "1rem" }}>
            <input
              placeholder="New task..."
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <button onClick={addTaskToProject}>➕ Add Task</button>
          </div>

          {/* ⏳ Pending */}
          <h4>Pending</h4>
          {pendingTasks.length === 0 && <p>No pending tasks</p>}
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

          {/* ✅ Completed */}
          <h4 style={{ marginTop: "1.5rem" }}>Completed</h4>
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
      )}
    </div>
  );
}

export default Projects;
