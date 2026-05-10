const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  type: String,
  location: String,
  fillLevel: Number,
  lastEmptied: String
});

module.exports = mongoose.model("Bin", binSchema);