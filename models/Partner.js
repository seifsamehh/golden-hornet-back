const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  links: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Partner", partnerSchema);
