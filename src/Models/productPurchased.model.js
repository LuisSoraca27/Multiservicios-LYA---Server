import db from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const ProductPurchased = db.define('productPurchased', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    data1: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data2: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    data3: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    // whyProduct: {
    //     type: DataTypes.STRING,
    //     allowNull: true
    // },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active'
    },
});

export default ProductPurchased;