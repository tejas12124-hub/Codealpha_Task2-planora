import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar isOpen={sidebarOpen} />

      <div style={{ flex: 1 }}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
