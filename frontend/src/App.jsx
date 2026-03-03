import PrivateRoute from "./components/PrivateRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Notifications from "./pages/Notifications";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route
    path="/dashboard/*"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>

    </BrowserRouter>
  );
}

export default App;
