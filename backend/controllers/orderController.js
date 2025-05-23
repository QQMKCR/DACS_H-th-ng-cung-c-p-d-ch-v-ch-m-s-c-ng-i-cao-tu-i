import Order from '../models/Order.js';
import Invoice from '../models/Invoice.js';
import OrderDetail from '../models/OrderDetail.js';

// Lấy toàn bộ đơn đặt dịch vụ (chỉ thông tin đơn)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll(); // Không include liên kết
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn đặt', error });
  }
};

// Lấy đơn đặt theo MaDonDat
export const getOrderById = async (req, res) => {
  const { MaDonDat } = req.params;
  try {
    const order = await Order.findByPk(MaDonDat); // Không include liên kết
    if (!order) {
      return res.status(404).json({ message: 'Đơn đặt không tồn tại' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin đơn đặt', error });
  }
};

// Tạo đơn đặt mới
export const createOrder = async (req, res) => {
  const { MaTKND, MaTKNV, NgayDatDon } = req.body;
  try {
    const newOrder = await Order.create({
      MaTKND,
      MaTKNV,
      NgayDatDon
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo đơn đặt', error });
  }
};

// Cập nhật đơn đặt
export const updateOrder = async (req, res) => {
  const { MaDonDat } = req.params;
  const { MaTKND, MaTKNV, NgayDatDon } = req.body;
  try {
    const order = await Order.findByPk(MaDonDat);
    if (!order) {
      return res.status(404).json({ message: 'Đơn đặt không tồn tại' });
    }
    await order.update({
      MaTKND,
      MaTKNV,
      NgayDatDon
    });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật đơn đặt', error });
  }
};

// Xóa đơn đặt
export const deleteOrder = async (req, res) => {
  const { MaDonDat } = req.params;
  try {
    // Tìm đơn đặt theo khóa chính
    const order = await OrderDetail.findByPk(MaDonDat);
    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn đặt' });
    }

    // Xoá hóa đơn liên quan trước
    await Invoice.destroy({
      where: { MaDonDat }
    });

    // Xoá đơn đặt
    await order.destroy();

    res.status(200).json({ message: 'Xoá đơn đặt và hóa đơn thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xoá đơn đặt', error });
  }
};
// Lấy số lượng đơn đặt hàng
export const getOrderCount = async (req, res) => {
  try {
    const count = await Order.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy số lượng đơn đặt', error });
  }
};
