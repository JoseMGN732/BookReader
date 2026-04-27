const BASE_URL = "https://openlibrary.org/search.json?q=";

export const getBooks = async (search = "popular") => {
  try {
    const res = await fetch(`${BASE_URL}${search}`);
    const data = await res.json();

    return data.docs.map((book) => ({
      id: book.key,
      title: book.title,
      author: book.author_name?.[0] || "Autor desconocido",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "https://via.placeholder.com/150"
    }));
    
  } catch (error) {
    console.error("Error API:", error);
    return [];
  }
};