const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    postCode: String,
    country: String,
  });
const invoiceSchema = new mongoose.Schema({
    id: { type: String, required: true },
    createdAt: { type: String, required: true },
    paymentDue: String,
    description: String,
    paymentTerms: Number,
    clientName: String,
    clientEmail: String,
    status: String,
    senderAddress: addressSchema,
    clientAddress: addressSchema,
    items: [
        {
          name: String,
          quantity: Number,
          price: Number,
          total: Number,
        },
      ],
      total: Number,
});

const Invoice = mongoose.model("Invoice", invoiceSchema)

module.exports = Invoice