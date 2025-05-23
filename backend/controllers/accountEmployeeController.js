import AccountEmployee from '../models/AccountEmployee.js';

// Lấy tất cả tài khoản nhân viên
export const getAllAccountEmployees = async (req, res) => {
  try {
    const accounts = await AccountEmployee.findAll();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy tài khoản nhân viên', error });
  }
};

// Lấy tài khoản nhân viên theo MaTKNV
export const getAccountEmployeeById = async (req, res) => {
  const { MaTKNV } = req.params;
  try {
    const account = await AccountEmployee.findByPk(MaTKNV);
    if (!account) return res.status(404).json({ message: 'Tài khoản không tồn tại' });
    res.json(account);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy tài khoản nhân viên', error });
  }
};

// Tạo tài khoản nhân viên mới
export const createAccountEmployee = async (req, res) => {
  try {
    const newAccount = await AccountEmployee.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi tạo tài khoản', error });
  }
};

// Cập nhật tài khoản nhân viên
export const updateAccountEmployee = async (req, res) => {
  const { MaTKNV } = req.params;
  try {
    const account = await AccountEmployee.findByPk(MaTKNV);
    if (!account) return res.status(404).json({ message: 'Tài khoản không tồn tại' });
    await account.update(req.body);
    res.json(account);
  } catch (error) {
    res.status(400).json({ message: 'Lỗi khi cập nhật tài khoản', error });
  }
};

// Xóa tài khoản nhân viên
export const deleteAccountEmployee = async (req, res) => {
  const { MaTKNV } = req.params;
  try {
    const account = await AccountEmployee.findByPk(MaTKNV);
    if (!account) return res.status(404).json({ message: 'Tài khoản không tồn tại' });
    await account.destroy();
    res.json({ message: 'Xóa tài khoản thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa tài khoản', error });
  }
};

// Lấy số lượng tài khoản nhân viên
export const getAccountEmployeeCount = async (req, res) => {
  try {
    const count = await AccountEmployee.count();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy số lượng tài khoản nhân viên', error });
  }
};
