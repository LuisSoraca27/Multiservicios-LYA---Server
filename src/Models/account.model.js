import  db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const Account = db.define('account', {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	offerPrice: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	durationOfService: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	emailAccount: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	passwordAccount: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	categoryId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

export default Account;