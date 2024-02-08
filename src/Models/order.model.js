import db from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const Order = db.define('order', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	nameProduct: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	priceProduct: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	productId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	orderDate: {
		type: DataTypes.DATE,
		allowNull: true,
		defaultValue: null
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

export default Order;