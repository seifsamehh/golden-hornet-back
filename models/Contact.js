const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "1m" },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;