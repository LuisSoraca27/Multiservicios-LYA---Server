import db  from '../Utils/database.util.js';
import { DataTypes } from "sequelize";


const imgCourse = db.define('imgCourse', {
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
    courseId: {
		type: DataTypes.STRING,
		allowNull: false,
	},
    status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

export default imgCourse;