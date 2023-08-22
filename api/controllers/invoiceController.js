const Invoice = require("../models/invoiceModel");

// Controller functions
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
// Create new invoice
exports.createNewInvoice = async (req, res) => {
  try {
    const newInvoice = Invoice.create(req.body);
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(400).json({ message: "Invalid Data" });
  }
};
// Delete invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    console.log(req.params);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not available..." });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit invoice

exports.editInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!updatedInvoice) {
      return res.status(404).json({ message: "item not found" });
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res.status(400).json({ message: "invalid" });
  }
};
