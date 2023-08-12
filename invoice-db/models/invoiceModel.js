const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    // What info the invoice should have
})

const Invoice = mongoose.model("Invoice", invoiceSchema)

module.exports = Invoice