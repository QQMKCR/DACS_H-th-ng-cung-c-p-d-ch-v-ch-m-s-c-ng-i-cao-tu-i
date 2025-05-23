import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const employeeService = {
  getEmployeeCount() {
    return apiClient.get('/employees/count');
  },
  getEmployees() {
    return apiClient.get('/employees');
  },
  getEmployee(MaNV) {
    return apiClient.get(`/employees/${MaNV}`);
  },
  getEmployeeByPosition(NgheNghiep) {
    return apiClient.get(`/employees/position/${NgheNghiep}`);
  },
  getEmployeeByDegree(BangCap) {
    return apiClient.get(`/employees/degree/${BangCap}`);
  },
  createEmployee(employee) {
    return apiClient.post('/employees', employee);
  },
  updateEmployee(MaNV, employee) {
    return apiClient.put(`/employees/${MaNV}`, employee);
  },
  deleteEmployee(MaNV) {
    return apiClient.delete(`/employees/${MaNV}`);
  }
};

export default employeeService;
