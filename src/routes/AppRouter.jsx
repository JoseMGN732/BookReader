import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Reader from "../pages/Reader";
import NotFound from "../pages/NotFound";
import Navbar from "../components/Navbar";
import Breadcrumbs from "../components/Breadcrumbs";
import ProtectedRoute from "../components/ProtectedRoute";
import PrivateRoute from "./PrivateRoute";
import Contact from "../pages/Contact";
import About from "../pages/About";
import MyBooks from "../pages/MyBooks";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Breadcrumbs />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
            path="/dashboard" 
            element={
              <PrivateRoute role="admin">
                  <Dashboard />
              </PrivateRoute>
            } 
        />
        <Route path="/reader/:id" element={<Reader />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-books" element={<MyBooks />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;