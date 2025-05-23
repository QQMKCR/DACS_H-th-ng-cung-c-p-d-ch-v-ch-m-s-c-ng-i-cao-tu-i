import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import AccountUser from './AccountUser.js';
import AccountEmployee from './AccountEmployee.js';

const Order = sequelize.define('Order', {
  MaDonDat : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    MaTKND: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    MaTKNV: {
    type: DataTypes.STRING,
    allowNull: false
    },
    NgayDatDon: {
    type: DataTypes.DATE,
    allowNull: false
    },
}, {
  tableName: 'dondatdichvu',
  timestamps: false
});

Order.belongsTo(AccountUser,{
    foreignKey: 'MaTKND',
    as: 'taikhoannguoidung'
});

Order.belongsTo(AccountEmployee, {
    foreignKey: 'MaTKNV',
    as: 'taikhoannhanvien'
})


export default Order;