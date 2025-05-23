import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Promotion = sequelize.define('Promotion', {
  MaKM: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  TenKM: {
    type: DataTypes.STRING,
    allowNull: false
  },
  MoTa: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  PhanTramKM: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  NgayBatDau: {
    type: DataTypes.DATE,
    allowNull: false
  },
  NgayKetThuc: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'khuyenmai', // tên bảng trong DB
  timestamps: false
});

export default Promotion;
