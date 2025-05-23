import Employee from '../models/Employee.js';

// Lấy toàn bộ nhân viên
export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy nhân viên theo MaNV
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.MaNV);
        if (!employee) {
            return res.status(404).json({ message: 'Nhân viên không tồn tại' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy nhân viên theo nghề nghiệp
export const getEmployeeByPosition = async (req, res) => {
    try {
        const { position } = req.params;
        const employees = await Employee.findAll({
            where: { NgheNghiep: position }
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy nhân viên theo bằng cấp
export const getEmployeeByDegree = async (req, res) => {
    try {
        const { degree } = req.params;
        const employees = await Employee.findAll({
            where: { BangCap: degree }
        });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Tạo mới nhân viên
export const createEmployee = async (req, res) => {
    try {
        const newEmployee = await Employee.create(req.body);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật thông tin nhân viên
export const updateEmployee = async (req, res) => {
    try {
        const [updated] = await Employee.update(req.body, {
            where: { MaNV: req.params.MaNV }
        });
        if (updated === 0) {
            return res.status(404).json({ message: 'Nhân viên không tồn tại' });
        }
        const updatedEmployee = await Employee.findByPk(req.params.MaNV);
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Chi tiết nhân viên (giống getEmployeeById)
export const detailEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByPk(req.params.MaNV);
        if (!employee) {
            return res.status(404).json({ message: 'Nhân viên không tồn tại' });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Xóa nhân viên
export const deleteEmployee = async (req, res) => {
    try {
        const deleted = await Employee.destroy({
            where: { MaNV: req.params.MaNV }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Nhân viên không tồn tại' });
        }
        res.status(200).json({ message: 'Nhân viên đã được xoá' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xoá nhân viên', error });
    }
};

// Lấy số lượng nhân viên
export const getEmployeeCount = async (req, res) => {
    try {
        const count = await Employee.count();
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
