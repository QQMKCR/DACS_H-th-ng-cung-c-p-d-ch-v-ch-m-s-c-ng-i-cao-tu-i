import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Đã đổi thành đúng prefix gắn ở backend
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Quản lý tài khoản nhân viên
const accountEmployeeService = {
  getAccountEmployeeCount() {
    return apiClient.get('/accountEmployees/count');
  },
  getAccountEmployees() {
    return apiClient.get('/accountEmployees');
  },
  getAccountEmployee(MaTKNV) {
    return apiClient.get(`/accountEmployees/${MaTKNV}`);
  },
  createAccountEmployee(accountEmployee) {
    return apiClient.post('/accountEmployees', accountEmployee);
  },
  updateAccountEmployee(MaTKNV, accountEmployee) {
    return apiClient.put(`/accountEmployees/${MaTKNV}`, accountEmployee);
  },
  deleteAccountEmployee(MaTKNV) {
    return apiClient.delete(`/accountEmployees/${MaTKNV}`);
  },
};

export default accountEmployeeService ;