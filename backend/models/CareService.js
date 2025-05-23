import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const CareService = sequelize.define('CareService',{
    MaDV: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    MaLoai: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    TenDV: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MoTa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Gia: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    ThoiGianThucHien: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'dichvu',
    timestamps: false
});

export default CareService;