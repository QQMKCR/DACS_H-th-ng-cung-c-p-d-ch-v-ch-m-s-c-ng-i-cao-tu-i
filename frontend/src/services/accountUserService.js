import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Quản lý tài khoản người dùng
const accountUserService = {
  getAccountUserCount() {
    return apiClient.get('/accountusers/count');
  },
  getAccountUsers() {
    return apiClient.get('/accountusers');
  },
  getAccountUserByMaTKND(MaTKND) {
    return apiClient.get(`/accountusers/${MaTKND}`);
  },
  createAccountUser(accountUser) {
    return apiClient.post('/accountusers', accountUser);
  },
  updateAccountUser(MaTKND, accountUser) {
    return apiClient.put(`/accountusers/${MaTKND}`, accountUser);
  },
  deleteAccountUser(MaTKND) {
    return apiClient.delete(`/accountusers/${MaTKND}`);
  },
};

export default accountUserService;