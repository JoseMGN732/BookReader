import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "../css/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">📚 BookReader</div>

      <div 
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >☰</div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        {/* PUBLICO */}
        <Link to="/">Inicio</Link>
        <Link to="/about">Nosotros</Link>
        <Link to="/contact">Contacto</Link>

        {/* NO LOGUEADO */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        )}

        {/* USUARIO */}
        {user && (
          <>
            <Link to="/my-books">Mis Libros</Link>
          </>
        )}

        {/* ADMIN */}
        {user?.role === "admin" && (
          <Link to="/dashboard">Dashboard</Link>
        )}

        {/* LOGOUT */}
        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;