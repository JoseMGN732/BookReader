import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStorage, setStorage } from "../utils/storage"; // 🔥 NUEVO
import "../css/Home.css";

const Home = () => {
  const { user } = useAuth();

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchBooks = async (query = "popular") => {
    try {
      const res = await fetch(`https://gutendex.com/books/?search=${query}`);
      const data = await res.json();

      setBooks(data.results);
    } catch (error) {
      console.error("Error cargando libros:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks(search);
  };

  // ⭐ AGREGAR FAVORITO (PRO)
  const addFavorite = (book) => {
    if (!user) {
      alert("Debes iniciar sesión para usar favoritos");
      return;
    }

    const favorites = getStorage(user, "favorites") || [];

    const exists = favorites.find((b) => b.id === book.id);
    if (exists) return;

    const newBook = {
      id: book.id,
      title: book.title,
      author: book.authors?.[0]?.name || "Autor desconocido",
      cover:
        book.formats?.["image/jpeg"] ||
        "https://via.placeholder.com/150",
    };

    favorites.push(newBook);

    setStorage(user, "favorites", favorites);
  };

  // ⭐ VALIDAR FAVORITO
  const isFavorite = (id) => {
    const favorites = getStorage(user, "favorites") || [];
    return favorites.some((b) => b.id === id);
  };

  return (
    <div className="home-container">
      <h1>📚 Biblioteca</h1>

      {/* 🔍 BUSCADOR */}
      <form onSubmit={handleSearch} className="search-box">
        <input
          type="text"
          placeholder="Buscar libro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Buscar</button>
      </form>

      {/* 📚 LIBROS */}
      <div className="books-grid">
        {books.length > 0 ? (
          books.map((book) => {
            const cover =
              book.formats?.["image/jpeg"] ||
              "https://via.placeholder.com/150";

            const author =
              book.authors?.[0]?.name || "Autor desconocido";

            return (
              <div className="book-card" key={book.id}>
                
                {/* 🔒 CONTROL DE ACCESO */}
                {user ? (
                  <Link to={`/reader/${book.id}`} state={{ book }}>
                    <img src={cover} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{author}</p>
                  </Link>
                ) : (
                  <div
                    onClick={() =>
                      alert("Debes iniciar sesión para leer")
                    }
                  >
                    <img src={cover} alt={book.title} />
                    <h3>{book.title}</h3>
                    <p>{author}</p>
                  </div>
                )}

                {/* ⭐ FAVORITOS */}
                {user && (
                  <button
                    className={`fav-btn ${
                      isFavorite(book.id) ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      addFavorite(book);
                    }}
                  >
                    ⭐
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p>No hay libros disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Home;