const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableHistorySchema = new Schema({
    // start_at: Date(),
    // end_at: Date(),
    table_id: { type: String },
    table_color: { type: String, default: 'White'},
    table_status: {type: String, default: "Occupied"},
    order: { type: String },
    order_quantity: { type: String },
    availability: { type: Boolean, default: false}
});

const TableHistory = mongoose.model("TableHistory", tableHistorySchema);

module.exports = TableHistory;

