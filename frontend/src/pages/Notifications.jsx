import { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/notifications")
      .then(res => {
        setNotifications(res.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load notifications");
        setLoading(false);
      });
  }, []);

  const markAllRead = async () => {
    await API.put("/notifications/read");
    setNotifications(
      notifications.map(n => ({ ...n, read: true }))
    );
    toast.success("All notifications marked read");
  };

  const clearAll = async () => {
    if (!window.confirm("Clear all notifications?")) return;

    try {
      await API.delete("/notifications/clear");
      setNotifications([]);
      toast.success("Notifications cleared");
    } catch {
      toast.error("Failed to clear");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Notifications 🔔</h2><br/>

      {notifications.length > 0 && (
        <button onClick={markAllRead}>
          Mark all as read
        </button>
      )}


      {notifications.length > 0 && (
        <button
          onClick={clearAll}
          style={{ marginBottom: "1rem" }}
        >
          Clear all
        </button>
      )}

      {notifications.length === 0 && (
        <p>No notifications yet</p>
      )}

      <div className="stats">
        {notifications.map(n => (
          <div
            key={n._id}
            className="stat-card"
            style={{
              opacity: n.read ? 0.6 : 1,
              borderLeft: n.read
                ? "4px solid gray"
                : "4px solid var(--primary)",
            }}
          >
            <p>{n.message}</p>
            {new Date(n.createdAt).toLocaleString()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;