const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import routes
const invoiceRoutes = require('./routes/invoiceRoutes');

// Use routes
app.use('/invoices', invoiceRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('You got this!!!')
});
