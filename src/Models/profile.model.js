import db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";


const Profile = db.define('profile', {
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
		defaultValue: 0
	},
	offerPrice: {
		type: DataTypes.INTEGER,
		allowNull: false,
        defaultValue: 0
	},
	emailAccount: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	passwordAccount: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    profileAccount: {
		type: DataTypes.STRING,
		allowNull: true,
	},
    pincodeAccount: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	isCombo: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	},
	durationOfService: {
		type: DataTypes.INTEGER,
		allowNull: true,
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

export default Profile;