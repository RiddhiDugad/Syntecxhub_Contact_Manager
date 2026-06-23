import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    const contact = await Contact.create({ name, email, phone });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};