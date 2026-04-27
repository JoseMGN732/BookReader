import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔥 1. CREAR ADMIN AUTOMÁTICO (NUEVO)
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const adminExists = users.find(
      (u) => u.email === "admin@admin.com"
    );

    if (!adminExists) {
      const adminUser = {
        email: "admin@admin.com",
        password: "123456",
        role: "admin",
      };

      users.push(adminUser);
      localStorage.setItem("users", JSON.stringify(users));

      console.log("✅ Admin creado automáticamente");
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("session"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        email: foundUser.email,
        role: foundUser.role || "user",
      };

      setUser(userData);

      // 🔥 guardar sesión
      localStorage.setItem("session", JSON.stringify(userData));

      return true;
    }

    return false;
  };

  // 📝 REGISTER
  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email);
    if (exists) {
      alert("El usuario ya existe");
      return false;
    }

    const newUser = {
      email,
      password,
      role: "user",
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    return true;
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("session");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);