import db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const imgLicense = db.define('imgLicense', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	urlImagen: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    licenseId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

export default imgLicense;