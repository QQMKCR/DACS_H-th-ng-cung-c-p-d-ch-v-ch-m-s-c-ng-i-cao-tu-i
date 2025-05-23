import Evaluation from '../models/Evaluation.js';

// Lấy toàn bộ đánh giá
export const getAllEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll();
    res.status(200).json(evaluations);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đánh giá', error });
  }
};

// Lấy đánh giá theo mã đơn đặt
export const getEvaluationByOrderId = async (req, res) => {
  const { MaDonDat } = req.params;
  try {
    const evaluation = await Evaluation.findOne({ where: { MaDonDat } });
    if (!evaluation) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy đánh giá', error });
  }
};

// Tạo đánh giá mới
export const createEvaluation = async (req, res) => {
  const { MaDonDat, MaDanhGia, SoSao, NoiDung, NgayDanhGia } = req.body;
  try {
    const newEvaluation = await Evaluation.create({
      MaDonDat,
      MaDanhGia,
      SoSao,
      NoiDung,
      NgayDanhGia,
    });
    res.status(201).json(newEvaluation);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo đánh giá', error });
  }
};

// Cập nhật đánh giá
export const updateEvaluation = async (req, res) => {
  const { MaDonDat } = req.params;
  const { MaDanhGia, SoSao, NoiDung, NgayDanhGia } = req.body;
  try {
    const evaluation = await Evaluation.findOne({ where: { MaDonDat } });
    if (!evaluation) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }
    await evaluation.update({
      MaDanhGia,
      SoSao,
      NoiDung,
      NgayDanhGia,
    });
    res.status(200).json(evaluation);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật đánh giá', error });
  }
};

// Xóa đánh giá
export const deleteEvaluation = async (req, res) => {
  const { MaDonDat } = req.params;
  try {
    const evaluation = await Evaluation.findOne({ where: { MaDonDat } });
    if (!evaluation) {
      return res.status(404).json({ message: 'Không tìm thấy đánh giá' });
    }
    await evaluation.destroy();
    res.status(200).json({ message: 'Đánh giá đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa đánh giá', error });
  }
};

// Lấy số lượng đánh giá
export const getEvaluationCount = async (req, res) => {
  try {
    const count = await Evaluation.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy số lượng đánh giá', error });
  }
};
