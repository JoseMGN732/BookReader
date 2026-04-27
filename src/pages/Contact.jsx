import { useState } from "react";
import "../css/contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Mensaje enviado correctamente");

    console.log(form);

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1>📩 Contáctanos</h1>
        <p>¿Tienes algún problema o sugerencia? Escríbenos.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            required
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Correo"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            placeholder="Mensaje"
            required
            rows="4"
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button>Enviar mensaje</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;