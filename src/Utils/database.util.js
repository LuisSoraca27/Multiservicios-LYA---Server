import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Establish db connection
const db = new Sequelize({
    dialect: "postgres",
    host: process.env.NODE_ENV === "production" ? process.env.PGHOST : process.env.PGHOST,
    username: process.env.NODE_ENV === "production" ? process.env.PGUSER : process.env.PGUSER,
    password: process.env.NODE_ENV === "production" ? process.env.PGPASSWORD :  process.env.PGPASSWORD,
    port: process.env.NODE_ENV === "production" ? process.env.PGPORT : process.env.PGPORT,
    database: process.env.NODE_ENV === "production" ? process.env.PGDATABASE : process.env.PGDATABASE,
    logging: false,
    dialectOptions:
        process.env.NODE_ENV === "production"
            ? {
                ssl: {
                    required: true,
                    rejectUnauthorized: false,
                },
            }
            : {},
});

export default db;