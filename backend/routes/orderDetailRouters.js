import express from 'express';
import {
  getAllOrderDetails,
  getOrderDetail,
  countOrdersByServiceType,
} from '../controllers/orderDetailController.js';

const router = express.Router();

// Lấy số lượng đơn đặt theo MaDV
router.get('/count', countOrdersByServiceType);

// Lấy toàn bộ chi tiết đơn đặt
router.get('/', getAllOrderDetails);

// Lấy chi tiết đơn đặt theo MaDonDat và MaDV
router.get('/:MaDonDat', getOrderDetail);



export default router;
