import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const userService = {
  getUserCount() {
    return apiClient.get('/users/count');
  },
  getUsers() {
    return apiClient.get('/users');
  },
  getUser(MaND) {
    return apiClient.get(`/users/${MaND}`);
  },
  createUser(user) {
    return apiClient.post('/users', user);
  },
  updateUser(MaND, user) {
    return apiClient.put(`/users/${MaND}`, user);
  },
  deleteUser(MaND) {
    return apiClient.delete(`/users/${MaND}`);
  }
};

export default userService;
