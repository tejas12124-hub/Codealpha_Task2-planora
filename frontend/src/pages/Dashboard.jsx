import { useNavigate, Routes, Route } from "react-router-dom";
import Projects from "./Projects";
import Tasks from "./Tasks";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/dashboard.css";
import Notifications from "./Notifications";


function Dashboard() {
  const [stats, setStats] = useState(null);
  const [isOpen, setIsOpen] = useState(true); 
const [activePage, setActivePage] = useState("dashboard");
const navigate = useNavigate();


  useEffect(() => {
    API.get("/dashboard/stats")
      .then(res => setStats(res.data))
      .catch(() => console.log("Dashboard load failed"));
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="app-layout">
     
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <h2 className="brand">Planora</h2>
       <ul className="menu">
  <li onClick={() => navigate("/dashboard")}>Dashboard</li>
  <li onClick={() => navigate("/dashboard/projects")}>Projects</li>
  <li onClick={() => navigate("/dashboard/tasks")}>Tasks</li>
  <li onClick={() => navigate("/dashboard/notifications")}>
  Notifications
</li>

</ul>



      </aside>

      
      <div className="main-area">
        <header className="header">
          
          <button className="menu-btn" onClick={() => setIsOpen(!isOpen)}>
            ☰
          </button>
          <h1>Dashboard</h1>
        </header>

        <Routes>
  <Route
    index
    element={
      <section className="stats">
        <div className="stat-card">
          <h3>Projects</h3>
          <p>Pending:2</p>
          <span>{stats.totalProjects}</span>
        </div>

        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p>Pending:4</p>
          <span>{stats.pendingTasks}</span>
        </div>

        <div className="stat-card">
          <h4>Notifications</h4>
          <p>Total:0</p>
          <span>{stats.notifications}</span>
        </div>
      </section>
    }
  />

   <Route path="projects" element={<Projects />} />
  <Route path="tasks" element={<Tasks />} />
  <Route path="notifications" element={<Notifications />} />

</Routes>

      </div>
    </div>
  );
}

export default Dashboard;
