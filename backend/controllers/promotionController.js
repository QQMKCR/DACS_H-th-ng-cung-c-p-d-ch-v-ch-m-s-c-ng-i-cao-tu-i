import Promotion from '../models/promotion.js';

// Lấy tất cả khuyến mãi
export const getAllPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi lấy danh sách khuyến mãi.' });
  }
};

// Tìm khuyên mãi theo tên
export const getPromotionByTenKM = async (req, res) => {
    const { TenKM } = req.params;
  try {
    const promotion = await Promotion.findOne({
      where: { TenKM }
    });
    if (promotion) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: `Không tìm thấy dịch vụ với TenKM: ${TenKM}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm dịch vụ', error });
  }
};

// Tìm khuyến mãi theo mã
export const getPromotionByMaKM = async (req, res) => {
    const { MaKM } = req.params;
  try {
    const promotion = await Promotion.findOne({
      where: { MaKM }
    });
    if (promotion) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: `Không tìm thấy dịch vụ với MaKM: ${MaKM}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm dịch vụ', error });
  }
};
// Tạo khuyến mãi mới
export const createPromotion = async (req, res) => {
  try {
    const newPromo = await Promotion.create(req.body);
    res.status(201).json(newPromo);
  } catch (error) {
    res.status(400).json({ error: 'Lỗi khi tạo khuyến mãi.', details: error.message });
  }
};

// Cập nhật khuyến mãi
export const updatePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promo = await Promotion.findByPk(id);
    if (!promo) {
      return res.status(404).json({ error: 'Không tìm thấy khuyến mãi.' });
    }
    await promo.update(req.body);
    res.json(promo);
  } catch (error) {
    res.status(400).json({ error: 'Lỗi khi cập nhật khuyến mãi.', details: error.message });
  }
};

// Xóa khuyến mãi
export const deletePromotion = async (req, res) => {
  const { id } = req.params;
  try {
    const promo = await Promotion.findByPk(id);
    if (!promo) {
      return res.status(404).json({ error: 'Không tìm thấy khuyến mãi.' });
    }
    await promo.destroy();
    res.json({ message: 'Xóa khuyến mãi thành công.' });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi khi xóa khuyến mãi.' });
  }
};
