import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const orderService = {
  getOrderCount() {
    return apiClient.get('/orders/count');
  },
  getOrders() {
    return apiClient.get('/orders');
  },
  getOrder(MaDonDat) {
    return apiClient.get(`/orders/${MaDonDat}`);
  },
  createOrder(order) {
    return apiClient.post('/orders', order);
  },
  updateOrder(MaDonDat, order) {
    return apiClient.put(`/orders/${MaDonDat}`, order);
  },
  deleteOrder(MaDonDat) {
    return apiClient.delete(`/orders/${MaDonDat}`);
  }
};

export default orderService;
