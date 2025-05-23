import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Order from './Order.js';

const Invoice = sequelize.define('Invoice', {
  MaHD : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    MaDonDat: {
    type: DataTypes.STRING,
    allowNull: false
    },
    NgayLapHD: {
    type: DataTypes.DATE,
    allowNull: false
    },
    TongTien: {
    type: DataTypes.DECIMAL,
    allowNull: false
    },
    PhuongThucThanhToan: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    TrangThaiXuLy: {
    type: DataTypes.STRING,
    allowNull: false,
    },
}, {
  tableName: 'hoadon',
  timestamps: false
});

Invoice.belongsTo(Order,{
    foreignKey: 'MaDonDat',
    as: 'dondatdichvu'
})

export default Invoice;