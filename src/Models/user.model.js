import  db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const User = db.define('user', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	balance: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true,
		unique: true,
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

export default User;
