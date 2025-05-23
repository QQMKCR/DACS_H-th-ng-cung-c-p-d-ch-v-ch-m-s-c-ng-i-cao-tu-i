import e from 'express';
import User from '../models/User.js';

// Lấy toàn bộ người dùng
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng', error });
  }
};

// Lấy người dùng theo MaND
export const getUserById = async (req, res) => {
  const { MaND } = req.params;
  try {
    const user = await User.findByPk(MaND);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng', error });
  }
};

// Tạo người dùng mới
export const createUser = async (req, res) => {
  const { Ho, Ten, NgaySinh, GioiTinh, Email, SDT, AnhDaiDien } = req.body;
  try {
    const newUser = await User.create({
      Ho,
      Ten,
      NgaySinh,
      GioiTinh,
      Email,
      SDT,
      AnhDaiDien
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo người dùng', error });
  }
};

// Cập nhật người dùng
export const updateUser = async (req, res) => {
  const { MaND } = req.params;
  const { Ho, Ten, NgaySinh, GioiTinh, Email, SDT, AnhDaiDien } = req.body;
  try {
    const user = await User.findByPk(MaND);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    await user.update({
      Ho,
      Ten,
      NgaySinh,
      GioiTinh,
      Email,
      SDT,
      AnhDaiDien
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật người dùng', error });
  }
};

// Xóa người dùng
export const deleteUser = async (req, res) => {
  const { MaND } = req.params;
  try {
    const user = await User.findByPk(MaND);
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }
    await user.destroy();
    res.status(200).json({ message: 'Người dùng đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa người dùng', error });
  }
};

// Lấy số lượng người dùng
export const getUserCount = async (req, res) => {
  try {
    const count = await User.count();
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy số lượng người dùng', error });
  }
};
