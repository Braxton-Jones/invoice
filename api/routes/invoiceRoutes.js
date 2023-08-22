const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoiceController");

// Get all invoices
router.get("/", invoiceController.getAllInvoices);
// Create new invoice
router.post("/", invoiceController.createNewInvoice);
// Delete current invoice
router.delete("/:id", invoiceController.deleteInvoice);
// Edit current invoice
router.put("/:id", invoiceController.editInvoice);

module.exports = router;
