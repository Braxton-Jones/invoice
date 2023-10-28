import axios from 'axios';

const api = axios.create({
  baseURL: 'https://charming-slug-nightgown.cyclic.app',
 
});

export const fetchInvoices = async (retryCount = 0) => {
  if (retryCount >= 5) {
    return JSON.parse(data);
  }

  try {
    const res = await api.get('/');
    return { data: res.data, loadingStatus: false };
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return fetchInvoices(retryCount + 1);
  }
};

export const createInvoice = async (invoiceData) => {
  try {
    const response = await api.post('/', invoiceData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInvoice = async (id) => {
  try {
    const res = await api.delete(`/${id}`);
    return res.data;
  } catch (error) {
    console.log('Error deleting', error);
  }
};

export const getOneInvoice = async (id) => {
  try {
    const res = await api.get(`/${id}`);
    return res.data;
  } catch (error) {
    console.log("Can't get the invoice", error);
  }
};
export const editInvoice = async (id, updatedData) => {
  try {
    const res = await api.put(`/${id}`, updatedData);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log('Error editing:', error.message);
  }
};
