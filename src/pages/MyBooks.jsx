import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStorage, setStorage } from "../utils/storage";
import "../css/mybooks.css";

const MyBooks = () => {
  const { user } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [progress, setProgress] = useState({});

  // ❌ eliminar favorito (PRO)
  const removeFavorite = (id) => {
    let favs = getStorage(user, "favorites") || [];

    favs = favs.filter((book) => book.id !== id);

    setStorage(user, "favorites", favs);
    setFavorites(favs);
  };

  // 📥 cargar datos
  useEffect(() => {
    if (!user) return;

    setFavorites(getStorage(user, "favorites") || []);
    setHistory(getStorage(user, "history") || []);
    setProgress(getStorage(user, "progress") || {});
  }, [user]);

  return (
    <div className="mybooks-container">
      <h1>📚 Mis Libros</h1>

      {/* ⭐ FAVORITOS */}
      <section>
        <h2>⭐ Favoritos</h2>
        <div className="books-grid">
          {favorites.length === 0 ? (
            <p>No tienes favoritos aún</p>
          ) : (
            favorites.map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.cover} alt={book.title} />
                <h3>{book.title}</h3>
                <p>{book.author}</p>

                <button
                  className="remove-btn"
                  onClick={() => {
                    if (confirm("¿Eliminar de favoritos?")) {
                      removeFavorite(book.id);
                    }
                  }}
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 📖 CONTINUAR LEYENDO */}
      <section>
        <h2>📖 Continuar leyendo</h2>
        <div className="books-grid">
          {Object.keys(progress).length === 0 ? (
            <p>No tienes progreso guardado</p>
          ) : (
            Object.values(progress).map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.cover} alt={book.title} />
                <h3>{book.title}</h3>
                <p>Página: {book.page}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 🕒 HISTORIAL */}
      <section>
        <h2>🕒 Historial</h2>
        <div className="books-grid">
          {history.length === 0 ? (
            <p>No hay historial</p>
          ) : (
            history.map((book, i) => (
              <div key={i} className="book-card">
                <img src={book.cover} alt={book.title} />
                <h3>{book.title}</h3>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default MyBooks;