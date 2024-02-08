import db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const ProfileInCombo = db.define('profileInCombo', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	comboId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    profileId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

export default ProfileInCombo;