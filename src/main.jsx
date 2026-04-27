import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BooksProvider>
      <AppRouter />
    </BooksProvider>
  </AuthProvider>
);