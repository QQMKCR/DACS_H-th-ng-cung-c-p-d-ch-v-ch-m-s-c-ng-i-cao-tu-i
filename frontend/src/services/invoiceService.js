import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const invoiceService = {
  getTotalRevenueAll() {
    return apiClient.get('/invoices/total');
  },
  getTotalRevenue(MaDonDat) {
    return apiClient.get(`/invoice/total/${MaDonDat}`);
  },
  getInvoices() {
    return apiClient.get('/invoices');
  },
  createInvoice(MaDonDat, invoice) {
    return apiClient.post(`/invoice/${MaDonDat}`, invoice);
  },
  updateInvoice(MaDonDat, invoice) {
    return apiClient.put(`/invoice/${MaDonDat}`, invoice);
  }

};

export default invoiceService;
