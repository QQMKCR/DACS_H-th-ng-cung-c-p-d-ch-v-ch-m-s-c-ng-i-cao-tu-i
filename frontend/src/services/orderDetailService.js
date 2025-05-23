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
  getOrderDetailsByMaLoai(){
    return apiClient.get('/order/count');
  },
  getOrderDetails(){
    return apiClient.get('/order/');
  },
  getOrderDetail(MaDonDat) {
    return apiClient.get(`/order/${MaDonDat}`);
  },
};

export default orderService;
