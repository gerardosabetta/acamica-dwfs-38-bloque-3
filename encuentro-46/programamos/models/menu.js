const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  plato: String,
  precio: Number,
  tipo_de_plato: String
});

module.exports = mongoose.model("menu", menuSchema);
