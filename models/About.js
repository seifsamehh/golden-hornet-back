const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    paragraph: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", aboutSchema);
