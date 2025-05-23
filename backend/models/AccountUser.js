import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const AccountUser = sequelize.define('AccountUser', {
  MaTKND: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  MaND: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  TenDN: {
    type: DataTypes.STRING,
    allowNull: false
  },
  MatKhau: {
    type: DataTypes.STRING,
    allowNull: false
  },
  VaiTro: {
    type: DataTypes.ENUM('admin', 'user'),
    allowNull: false
  }
}, {
  tableName: 'taikhoannguoidung',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
});

// Thiết lập quan hệ với bảng User
AccountUser.belongsTo(User, {
  foreignKey: 'MaND',
  as: 'NguoiDung'
});

export default AccountUser;
