import db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";


const imgCombo = db.define('imgCombo', {
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
    comboId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

export default imgCombo;