import Invoice from '../models/Invoice.js';
import OrderDetail from '../models/OrderDetail.js';
import CareService from '../models/CareService.js';

export const getAllInvoices = async (req, res) => {
  try {
    const orders = await Invoice.findAll(); // Không include liên kết
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn đặt', error });
  }
};
// Tạo hóa đơn dựa trên đơn đặt
export const createInvoiceForOrder = async (MaDonDat) => {
  try {
    // Lấy thông tin chi tiết đơn đặt để tính tổng tiền, ví dụ:
    const orderDetail = await OrderDetail.findOne({
      where: { MaDonDat },
      include: [
        {
          model: CareService,
          as: 'dichvu',
          attributes: ['Gia']  // giả sử CareService có trường Giá tiền
        }
      ]
    });

    if (!orderDetail) {
      throw new Error('Không tìm thấy chi tiết đơn đặt để tạo hóa đơn');
    }

    // Tính tổng tiền - đơn giản lấy giá dịch vụ, có thể mở rộng tính theo số lượng, khuyến mãi...
    const tongTien = orderDetail.dichvu?.GiaTien || 0;

    // Tạo hóa đơn mới
    const invoice = await Invoice.create({
      MaDonDat,
      NgayLap: new Date(),
      TongTien: tongTien,
      TrangThaiThanhToan: 'Chưa thanh toán' // trạng thái mặc định
    });

    return invoice;
  } catch (error) {
    console.error('Lỗi khi tạo hóa đơn:', error);
    throw error;
  }
};

// Hàm cập nhật hóa đơn theo MaDonDat
export const updateInvoiceForOrder = async (MaDonDat) => {
  try {
    // Lấy chi tiết đơn đặt mới nhất
    const orderDetail = await OrderDetail.findOne({
      where: { MaDonDat },
      include: [
        {
          model: CareService,
          as: 'dichvu',
          attributes: ['Gia']
        }
      ]
    });

    if (!orderDetail) {
      throw new Error('Không tìm thấy chi tiết đơn đặt để cập nhật hóa đơn');
    }

    // Tính lại tổng tiền (có thể mở rộng logic ở đây)
    const tongTien = orderDetail.dichvu?.GiaTien || 0;

    // Tìm hóa đơn theo MaDonDat
    const invoice = await Invoice.findOne({ where: { MaDonDat } });
    if (!invoice) {
      throw new Error('Không tìm thấy hóa đơn để cập nhật');
    }

    // Cập nhật hóa đơn
    invoice.TongTien = tongTien;
    // Có thể cập nhật thêm các trường khác nếu cần
    await invoice.save();

    return invoice;
  } catch (error) {
    console.error('Lỗi khi cập nhật hóa đơn:', error);
    throw error;
  }
};

// Hàm tính tổng tiền hóa đơn
export const getTotalRevenue = async (req, res) => {
  const MaDonDat = req.params.MaDonDat || req.query.MaDonDat;

  try {
    let tongTien = 0;

    if (!MaDonDat) {
      const invoices = await Invoice.findAll();
      tongTien = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.TongTien || 0), 0);
    } else {
      const invoice = await Invoice.findOne({ where: { MaDonDat } });
      if (!invoice) {
        return res.status(404).json({ message: 'Không tìm thấy hóa đơn để tính tổng tiền' });
      }
      tongTien = parseFloat(invoice.TongTien) || 0;
    }

    return res.status(200).json({ totalRevenue: tongTien });

  } catch (error) {
    console.error('Lỗi khi tính tổng tiền hóa đơn:', error);
    return res.status(500).json({ message: 'Lỗi khi tính tổng tiền hóa đơn', error });
  }
};


