const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employeeId: {type: Number, required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  email: { type: String}
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
