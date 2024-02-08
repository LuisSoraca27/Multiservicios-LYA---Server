import db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const License = db.define('license', {
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

export default License;