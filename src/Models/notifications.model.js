import db from '../Utils/database.util.js';
import { DataTypes } from "sequelize";

const Notifications = db.define('notifications', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'normal',
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Notifications;
