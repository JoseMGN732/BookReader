import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStorage, setStorage } from "../utils/storage";
import "../css/Reader.css";

const Reader = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const bookData = location.state?.book;

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBook = async () => {
      try {
        const res = await fetch(`/books/${id}.txt`);
        const text = await res.text();

        const words = text.split(" ");
        const chunkSize = 300;

        const paginated = [];

        for (let i = 0; i < words.length; i += chunkSize) {
          paginated.push(words.slice(i, i + chunkSize).join(" "));
        }

        setPages(paginated);

        const progress = getStorage(user, "progress") || {};

        if (progress[id]) {
          setCurrentPage(progress[id].page);
        }

      } catch (error) {
        console.error("Error cargando libro:", error);
      }
    };

    fetchBook();
  }, [id, user]);

  useEffect(() => {
    if (!user || pages.length === 0) return;

    const progress = getStorage(user, "progress") || {};

    progress[id] = {
      id,
      page: currentPage,
      title: bookData?.title || "Sin título",
      cover:
        bookData?.formats?.["image/jpeg"] ||
        "https://via.placeholder.com/150",
    };

    setStorage(user, "progress", progress);
  }, [currentPage, id, user, pages]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="reader-container">
      <div className="book">
        <div key={currentPage} className="page fade">
          {pages[currentPage]}
        </div>
      </div>

      <div className="controls">
        <button onClick={prevPage}>⬅ Anterior</button>
        <span>{currentPage + 1} / {pages.length}</span>
        <button onClick={nextPage}>Siguiente ➡</button>
      </div>
    </div>
  );
};

export default Reader;