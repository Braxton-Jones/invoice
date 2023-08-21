import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchInvoices = async () => {
  try{
    const res = await api.get("/invoices")
    return {data: res.data, loadingStatus: false}
  }
  catch (error){
    console.log("Can't get the invoices", error)
  }
};

export const createInvoice = async (invoiceData) => {
  return api.post('/invoices', invoiceData);
};
