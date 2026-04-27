import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const logEvent = (event) => {
    const logs = JSON.parse(localStorage.getItem("logs")) || [];
    logs.push({ event, date: new Date() });
    localStorage.setItem("logs", JSON.stringify(logs));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      alert("Correo inválido ❌");
      return;
    }

    const success = login(form.email, form.password);

    if (success) {
      logEvent("login_exitoso");

      alert("Inicio de sesión exitoso ✅");

      navigate("/");
    } else {
      alert("Correo o contraseña incorrectos ❌");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Iniciar Sesión</h2>

        <input
          type="email"
          placeholder="Correo"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Contraseña"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button>Entrar</button>

        <div className="login-link">
          ¿No tienes cuenta? <a href="/Register">Regístrate</a>
        </div>
      </form>
    </div>
  );
};

export default Login;