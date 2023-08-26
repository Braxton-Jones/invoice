import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchInvoices = async () => {
  try {
    const res = await api.get('/invoices');
    return { data: res.data, loadingStatus: false };
  } catch (error) {
    console.log("Can't get the invoices", error);
    setTimeout(async () => {
      await fetchInvoices(); // Use await here to ensure proper recursion
    }, 5000);
  }
};

export const createInvoice = async (invoiceData) => {
  return api.post('/invoices', invoiceData);
};

export const deleteInvoice = async (id) => {
  try {
    const res = await api.delete(`/invoices/${id}`);
    return res.data;
  } catch (error) {
    console.log('Error deleting', error);
  }
};

export const getOneInvoice = async (id) => {
  try {
    const res = await api.get(`/invoices/${id}`);
    return res.data;
  } catch (error) {
    console.log("Can't get the invoice", error);
  }
};

export const editInvoice = async (id, updatedData) => {
  try {
    const res = await api.put(`/invoices/${id}`, updatedData);
    return res.data;
  } catch (error) {
    console.log('Error editing', error);
  }
};
