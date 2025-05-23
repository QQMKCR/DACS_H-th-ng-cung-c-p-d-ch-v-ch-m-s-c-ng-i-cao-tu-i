import express from 'express';
import{
    getAllOrders,
    getOrderById,
    getOrderCount,
    createOrder,
    updateOrder,
    deleteOrder
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/count/', getOrderCount); // Lấy số lượng đơn đặt hàng
router.get('/', getAllOrders);
router.get('/:MaDonDat', getOrderById);
router.post('/', createOrder);
router.put('/:MaDonDat', updateOrder);
router.delete('/:MaDonDat', deleteOrder);

export default router;