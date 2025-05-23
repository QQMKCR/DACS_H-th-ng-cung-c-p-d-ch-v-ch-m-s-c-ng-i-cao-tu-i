import OrderDetail from '../models/OrderDetail.js';
import CareService from '../models/CareService.js'; // Model bảng DichVu

// Lấy toàn bộ chi tiết đơn đặt (có tên dịch vụ)
export const getAllOrderDetails = async (req, res) => {
  try {
    const details = await OrderDetail.findAll({
      attributes: [
        'MaDonDat',
        'MaDV',
        'NgayChamSoc',
        'GioBatDau',
        'DiaChi',
        'YeuCauDacBiet',
        'TrangThaiDon'
      ],
      include: [
        {
          model: CareService,
          as: 'dichvu',
          attributes: ['TenDV']
        }
      ]
    });

    const response = details.map(detail => ({
      MaDonDat: detail.MaDonDat,
      TenDichVu: detail.dichvu?.TenDV || null,
      NgayChamSoc: detail.NgayChamSoc,
      GioBatDau: detail.GioBatDau,
      DiaChi: detail.DiaChi,
      YeuCauDacBiet: detail.YeuCauDacBiet,
      TrangThaiDon: detail.TrangThaiDon
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách chi tiết đơn đặt', error });
  }
};


// Lấy chi tiết theo MaDonDat
export const getOrderDetail = async (req, res) => {
  const { MaDonDat } = req.params;
  try {
    const detail = await OrderDetail.findOne({
      where: { MaDonDat },
      attributes: [
        'MaDonDat',
        'MaDV',
        'NgayChamSoc',
        'GioBatDau',
        'DiaChi',
        'YeuCauDacBiet',
        'TrangThaiDon'
      ],
      include: [
        {
          model: CareService,
          as: 'dichvu', // alias
          attributes: ['TenDV']
        }
      ]
    });

    if (!detail) {
      return res.status(404).json({ message: 'Chi tiết đơn không tồn tại' });
    }

    const response = {
      MaDonDat: detail.MaDonDat,
      TenDV: detail.dichvu?.TenDV || 'Không rõ', // Lấy tên dịch vụ từ model liên kết
      NgayChamSoc: detail.NgayChamSoc,
      GioBatDau: detail.GioBatDau,
      DiaChi: detail.DiaChi,
      YeuCauDacBiet: detail.YeuCauDacBiet,
      TrangThaiDon: detail.TrangThaiDon
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy chi tiết đơn', error });
  }
};

// Tạo chi tiết đơn đặt mới
export const createOrderDetail = async (req, res) => {
  const { MaDonDat, MaDV, NgayChamSoc, GioBatDau, DiaChi, YeuCauDacBiet, TrangThaiDon } = req.body;
  try {
    const newDetail = await OrderDetail.create({
      MaDonDat,
      MaDV,
      NgayChamSoc,
      GioBatDau,
      DiaChi,
      YeuCauDacBiet,
      TrangThaiDon
    });
    res.status(201).json(newDetail);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo chi tiết đơn đặt', error });
  }
};

// Cập nhật chi tiết đơn đặt
export const updateOrderDetail = async (req, res) => {
  const { MaDonDat } = req.params;
  const { MaDV, NgayChamSoc, GioBatDau, DiaChi, YeuCauDacBiet, TrangThaiDon } = req.body;
  try {
    const detail = await OrderDetail.findByPk(MaDonDat);
    if (!detail) {
      return res.status(404).json({ message: 'Chi tiết đơn không tồn tại' });
    }
    await detail.update({
      MaDV,
      NgayChamSoc,
      GioBatDau,
      DiaChi,
      YeuCauDacBiet,
      TrangThaiDon
    });
    res.status(200).json(detail);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật chi tiết đơn đặt', error });
  }
};
// Xóa chi tiết đơn đặt
export const deleteOrderDetail = async (req, res) => {
  const { MaDonDat } = req.params;
  try {
    const detail = await OrderDetail.findByPk(MaDonDat);
    if (!detail) {
      return res.status(404).json({ message: 'Chi tiết đơn không tồn tại' });
    }
    await detail.destroy();
    res.status(200).json({ message: 'Chi tiết đơn đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa chi tiết đơn đặt', error });
  }
};

// Đếm số lượng đơn đặt theo theo mã loại của mã dich vụ
export const countOrdersByServiceType = async (req, res) => {
  try {
    const [donLe, goi] = await Promise.all([
      OrderDetail.count({
        distinct: true,
        col: 'MaDonDat',
        include: [
          {
            model: CareService,
            as: 'dichvu',
            where: { MaLoai: 1 }
          }
        ]
      }),
      OrderDetail.count({
        distinct: true,
        col: 'MaDonDat',
        include: [
          {
            model: CareService,
            as: 'dichvu',
            where: { MaLoai: 2 }
          }
        ]
      }),
    ]);

    res.status(200).json([
      { name: "Đơn sử dụng DV đơn lẻ", value: donLe },
      { name: "Đơn sử dụng DV theo gói", value: goi }
    ]);
  } catch (error) {
    console.error("Lỗi:", error);
    res.status(500).json({ message: 'Lỗi khi đếm đơn theo loại dịch vụ', error });
  }
};




