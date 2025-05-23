import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Employee = sequelize.define('Employee', {
  MaNV : {
    type: DataTypes.STRING,
    primaryKey: true
    },
    HoVaTenLot: {
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
    type: DataTypes.TINYINT,
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
    DiaChi:{
    type: DataTypes.TEXT,
    allowNull: false
    },
    SDT: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
    },
    NgheNghiep:{
        type: DataTypes.STRING,
        allowNull: false
    },
    BangCap:{
        type: DataTypes.STRING,
        allowNull: false
    },
    KinhNghiem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TenNH: {
        type: DataTypes.STRING,
        allowNull: false
    },
    STK: {
        type: DataTypes.STRING,
        allowNull: false
    },
    HinhDaiDien: {
    type: DataTypes.STRING,
    allowNull: true
    },
  },{
  tableName: 'nhanvienchamsoc',
  timestamps: false
});

export default Employee;