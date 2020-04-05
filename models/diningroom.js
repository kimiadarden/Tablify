const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const diningroomSchema = new Schema({
  seats: { type: Number, required: true },
  availability: { type: Boolean, default: true}
});

const Diningroom = mongoose.model("Diningroom", diningroomSchema);

module.exports = Diningroom;


