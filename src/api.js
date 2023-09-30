import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// baseURL: 'https://invoice-mgqv.onrender.com/'
export async function sleep(ms) {
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve()
      }, ms)
  })
}
export const fetchInvoices = async () => {
  await sleep(5000)
  try {
    const res = await api.get('/invoices');
    return { data: res.data, loadingStatus: false };
  } catch (error) {
    return null
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await api.post('/invoices', invoiceData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
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
    console.log(res);
    return res.data;
  } catch (error) {
    console.log('Error editing:', error.message);
  }
};
