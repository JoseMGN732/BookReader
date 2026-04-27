import { Link, useLocation } from "react-router-dom";
import "../css/breadcrumbs.css";

const Breadcrumbs = () => {
  const location = useLocation();

  const pathnames = location.pathname
    .split("/")
    .filter((x) => x);

  return (
    <div className="breadcrumbs">
      <Link to="/">Inicio</Link>

      {pathnames.map((value, index) => {
        const to = "/" + pathnames.slice(0, index + 1).join("/");

        let name = value;

        if (value === "dashboard") name = "Dashboard";
        if (value === "reader") name = "Lectura";
        if (value === "mybooks") name = "Mis Libros";
        if (value === "login") name = "Login";

        return (
          <span key={to}>
            {" / "}
            <Link to={to}>{name}</Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;