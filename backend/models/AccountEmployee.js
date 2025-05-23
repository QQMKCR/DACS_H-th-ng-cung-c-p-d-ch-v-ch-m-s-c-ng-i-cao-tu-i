import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Employee from './Employee.js';

const AccountEmployee = sequelize.define('AccountEmployee', {
  MaTKNV: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  MaNV: {
    type: DataTypes.STRING,
    allowNull: false
  },
  TenDN: {
    type: DataTypes.STRING,
    allowNull: false
  },
  MatKhau: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'taikhoannhanvien',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

// Thiết lập quan hệ với bảng nhanvien
AccountEmployee.belongsTo(Employee, {
  foreignKey: 'MaNV',
  as: 'NhanVien'
});

export default AccountEmployee;
