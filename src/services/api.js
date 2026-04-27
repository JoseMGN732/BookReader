const BASE_URL = "https://gutendex.com/books/";

export const getBooks = async (search = "") => {
  const response = await fetch(`https://gutendex.com/books/?search=${search}`);
  const data = await response.json();
  return data.results;
};