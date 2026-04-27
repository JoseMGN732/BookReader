import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = register(form.email, form.password);

    if (success) {
      navigate("/login");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-card">

        <div className="register-logo">📖 BookReader</div>
        <p className="register-subtitle">Crea tu cuenta</p>

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

        <button>Registrarse</button>

        <div className="register-link">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </div>
      </form>
    </div>
  );
};

export default Register;