import AccountUser from '../models/AccountUser.js';

export const getAllAccountUsers = async (req, res) => {
  try {
    const accounts = await AccountUser.findAll();
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách tài khoản người dùng' });
  }
};

export const getAccountUserById = async (req, res) => {
  const { MaTKND } = req.params;
  try {
    const account = await AccountUser.findByPk(MaTKND);
    if (!account) return res.status(404).json({ message: 'Không tìm thấy tài khoản' });
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy tài khoản người dùng' });
  }
};

export const createAccountUser = async (req, res) => {
  try {
    const newAccount = await AccountUser.create(req.body);
    res.status(201).json(newAccount);
  } catch (err) {
    console.error('Lỗi khi tạo tài khoản người dùng:', err);
    res.status(500).json({ message: 'Lỗi khi tạo tài khoản người dùng' });
  }
};

export const updateAccountUser = async (req, res) => {
  const { MaTKND } = req.params;
  try {
    const account = await AccountUser.findByPk(MaTKND);
    if (!account) return res.status(404).json({ message: 'Không tìm thấy tài khoản' });

    await account.update(req.body);
    res.json(account);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi cập nhật tài khoản người dùng' });
  }
};

export const deleteAccountUser = async (req, res) => {
  const { MaTKND } = req.params;
  try {
    const account = await AccountUser.findByPk(MaTKND);
    if (!account) return res.status(404).json({ message: 'Không tìm thấy tài khoản' });

    await account.destroy();
    res.json({ message: 'Đã xóa tài khoản' });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi xóa tài khoản người dùng' });
  }
};

// Lấy số lượng tài khoản người dùng
export const getAccountUserCount = async (req, res) => {
  try {
    const count = await AccountUser.count();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy số lượng tài khoản người dùng' });
  }
};