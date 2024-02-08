import db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const CategoriesCP = db.define('categoriesCP', {
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
    status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

export default CategoriesCP;