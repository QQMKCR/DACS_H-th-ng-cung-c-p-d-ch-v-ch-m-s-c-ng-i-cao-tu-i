import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Order from './Order.js';

const Evaluation = sequelize.define('Evaluation', {
  MaDanhGia : {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
    },
    MaDonDat: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    NgayDanhGia: {
    type: DataTypes.DATE,
    allowNull: false
    },
    SoSao: {
    type: DataTypes.INTEGER,
    allowNull: false
    },
    NoiDung: {
    type: DataTypes.TEXT,
    allowNull: false,
    },
}, {
  tableName: 'danhgia',
  timestamps: false
});

Evaluation.belongsTo(Order,{
    foreignKey: 'MaDonDat',
    as: 'dondatdichvu'
})

export default Evaluation;