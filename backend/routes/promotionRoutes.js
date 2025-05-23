import express from 'express';
import {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  getPromotionByMaKM,
  getPromotionByTenKM
} from '../controllers/promotionController.js';

const router = express.Router();

// GET tất cả khuyến mãi
router.get('/', getAllPromotions);

// Tìm dịch vụ theo MaKM
router.get('/:MaKM', getPromotionByMaKM);

// Tìm dịch vụ theo TenKM
router.get('/:TenKM', getPromotionByTenKM);

// POST tạo mới
router.post('/', createPromotion);

// PUT cập nhật theo ID
router.put('/:id', updatePromotion);

// DELETE theo ID
router.delete('/:id', deletePromotion);

export default router;
