const mongoose = require("mongoose");
const Service = require("./Services");

const teamSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  link: { type: String, required: true },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
  },
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
