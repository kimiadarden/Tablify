const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  item: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  cook_time: { type: Number, required: true },
  createdAt: {type: Date},
  upDatedAt: {type: Date}
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
