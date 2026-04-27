import { useEffect, useState } from "react";
import "../css/dashboard.css";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    setLogs(storedLogs);
    setUsers(storedUsers);
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Panel de Administración</h1>

      <div className="dashboard-card">
        <h2>Usuarios Registrados</h2>
        {users.map((u, i) => (
          <p key={i}>
            {u.email} - <strong>{u.role}</strong>
          </p>
        ))}
      </div>

      <div className="dashboard-card">
        <h2>Actividad</h2>
        {logs.map((log, i) => (
          <p key={i}>
            {log.event} - {new Date(log.date).toLocaleString()}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;