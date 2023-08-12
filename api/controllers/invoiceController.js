const Invoice = require("../models/invoiceModel")

// Controller functions
exports.getAllInvoices = async (req,res) => {
    try{
        const invoices = await Invoice.find()
        res.status(200).json(invoices);
    }catch (error){
        res.status(500).json({message: "Server Error"})
    }
}
// Create new invoice

// Delete invoice

// Edit invoice