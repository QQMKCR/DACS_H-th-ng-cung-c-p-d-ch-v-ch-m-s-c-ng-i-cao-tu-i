import CareService from '../models/CareService.js';

// Lấy tất cả dịch vụ
export const getAllServices = async (req, res) => {
  try {
    const services = await CareService.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách dịch vụ', error });
  }
};

// Thêm dịch vụ mới
export const createService = async (req, res) => {
  try {
    const newService = await CareService.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi thêm dịch vụ', error });
  }
};

// Sửa dịch vụ theo maDV
export const updateService = async (req, res) => {
  const { maDV } = req.params;
  try {
    const [updated] = await CareService.update(req.body, {
      where: { maDV }
    });
    if (updated) {
      const updatedService = await CareService.findOne({ where: { maDV } });
      res.status(200).json(updatedService);
    } else {
      res.status(404).json({ message: `Không tìm thấy dịch vụ với maDV: ${maDV}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật dịch vụ', error });
  }
};

// Xoá dịch vụ theo maDV
export const deleteService = async (req, res) => {
  const { maDV } = req.params;
  try {
    const deleted = await CareService.destroy({
      where: { maDV }
    });
    if (deleted) {
      res.status(200).json({ message: `Đã xoá dịch vụ với maDV: ${maDV}` });
    } else {
      res.status(404).json({ message: `Không tìm thấy dịch vụ với maDV: ${maDV}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xoá dịch vụ', error });
  }
};

// Tìm dịch vụ theo maDV
export const getServiceByMaDV = async (req, res) => {
  const { maDV } = req.params;
  try {
    const service = await CareService.findOne({
      where: { maDV }
    });
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: `Không tìm thấy dịch vụ với maDV: ${maDV}` });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tìm dịch vụ', error });
  }
};

// Tính số lượng dịch vụ theo loại
export const countServicesByType = async (req, res) => {
  try {
    const [donLe, goi] = await Promise.all([
      CareService.count({ where: { maLoai: 1 } }),
      CareService.count({ where: { maLoai: 2 } })
    ]);

    res.status(200).json([
      { name: "Dịch vụ đơn lẻ", value: donLe },
      { name: "Dịch vụ gói", value: goi }
    ]);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi đếm dịch vụ theo loại', error });
  }
};
