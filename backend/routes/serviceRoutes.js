import express from 'express';
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getServiceByMaDV,
  countServicesByType,
} from '../controllers/serviceController.js';

const router = express.Router();

// Lấy tất cả dịch vụ
router.get('/', getAllServices);

// Thêm dịch vụ mới
router.post('/', createService);

// Tính tổng số lượng dịch vụ theo loại
router.get('/count/', countServicesByType);

// Tìm dịch vụ theo maDV
router.get('/:maDV', getServiceByMaDV);

// Cập nhật dịch vụ theo maDV
router.put('/:maDV', updateService);

// Xoá dịch vụ theo maDV
router.delete('/:maDV', deleteService);

export default router;
