import { Link } from "react-router-dom";
import "../css/notfound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1>404</h1>
        <h2>Página no encontrada</h2>

        <p>
          Parece que este libro se perdió en la biblioteca...
        </p>

        <Link to="/" className="home-btn">
          📚 Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;