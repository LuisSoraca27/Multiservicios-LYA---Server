import db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";


const Gift = db.define('gift', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
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

export default Gift;