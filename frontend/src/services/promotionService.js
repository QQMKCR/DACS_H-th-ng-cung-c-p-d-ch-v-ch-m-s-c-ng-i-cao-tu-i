import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

const promotionService = {
  // Lấy tất cả khuyến mãi
  getAllPromotions() {
    return apiClient.get('/promotions');
  },

  // Lấy chi tiết khuyến mãi theo mã
  getPromotionById(MaKM) {
    return apiClient.get(`/promotions/${MaKM}`);
  },

  // Tạo mới khuyến mãi
  createPromotion(promotion) {
    return apiClient.post('/promotions', promotion);
  },

  // Cập nhật khuyến mãi
  updatePromotion(MaKM, promotion) {
    return apiClient.put(`/promotions/${MaKM}`, promotion);
  },

  // Xóa khuyến mãi
  deletePromotion(MaKM) {
    return apiClient.delete(`/promotions/${MaKM}`);
  },
};

export default promotionService;
