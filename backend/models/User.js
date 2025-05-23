import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  MaND : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    Ho: {
    type: DataTypes.STRING,
    allowNull: false
    },
    Ten: {
    type: DataTypes.STRING,
    allowNull: false
    },
    NgaySinh: {
    type: DataTypes.DATE,
    allowNull: false
    },
    GioiTinh: {
    type: DataTypes.STRING,
    allowNull: false
    },
    Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
    },
    SDT: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
    },
    AnhDaiDien: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
    },
}, {
  tableName: 'nguoidung',
  timestamps: false
});

export default User;