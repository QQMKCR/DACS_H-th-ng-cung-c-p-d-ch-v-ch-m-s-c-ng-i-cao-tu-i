import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Order from './Order.js';
import CareService from './CareService.js';

const OrderDetail = sequelize.define('OrderDetail', {
  MaDonDat : {
    type: DataTypes.INTEGER,
    primaryKey: true
    },
    MaDV: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    },
    NgayChamSoc: {
    type: DataTypes.DATE,
    allowNull: false
    },
    GioBatDau: {
    type: DataTypes.TIME,
    allowNull: false
    },
    DiaChi: {
    type: DataTypes.TEXT,
    allowNull: false
    },
    YeuCauDacBiet: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
    },
    TrangThaiDon: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true
    }
    },
}, {
  tableName: 'ct_dondatdichvu',
  timestamps: false
});

OrderDetail.belongsTo(Order,{
    primaryKey: 'MaDonDat',
    as: 'dondatdichvu'
});

OrderDetail.belongsTo(CareService, {
    foreignKey: 'MaDV',
    as: 'dichvu'
})

export default OrderDetail;