import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const serviceService = {
  getAllServices() {
    return apiClient.get('/services');
  },
  getServiceCountByType() {
    return apiClient.get('/services/count');
  },
  getServiceByMaDV(MaDV) {
    return apiClient.get(`/services/${MaDV}`);
  },
  createService(service) {
    return apiClient.post('/services', service);
  },
  updateService(MaDV, service) {
    return apiClient.put(`/services/${MaDV}`, service);
  },
  deleteService(MaDV) {
    return apiClient.delete(`/services/${MaDV}`);
  }
};

export default serviceService;
