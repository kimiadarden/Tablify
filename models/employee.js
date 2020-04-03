const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  id: {type: Number, required: true},
  name: { type: String, required: true},
  position: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  startDate: {type: Date, required: true},
  email: { type: String},
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
