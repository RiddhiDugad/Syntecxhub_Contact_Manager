import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [editId, setEditId] = useState(null);

  const fetchContacts = async () => {
    const res = await axios.get("http://localhost:5000/api/contacts");
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveContact = async () => {
    if (editId) {
      await axios.put(`http://localhost:5000/api/contacts/${editId}`, form);
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/contacts", form);
    }
    setForm({ name: "", email: "", phone: "" });
    fetchContacts();
  };

  const deleteContact = async (id) => {
    await axios.delete(`http://localhost:5000/api/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div>
      <h2>Contact Manager</h2>

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />

      <button onClick={saveContact}>
        {editId ? "Update Contact" : "Add Contact"}
      </button>

      <ul>
        {contacts.map((c) => (
          <li key={c._id}>
            {c.name} - {c.email} - {c.phone}
            <button
              onClick={() => {
                setForm({ name: c.name, email: c.email, phone: c.phone });
                setEditId(c._id);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteContact(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;