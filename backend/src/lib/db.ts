import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Check connection
async function checkConnection() {
    try {
        const connection = await pool.getConnection();
        console.log(` MySQL Connected to ${process.env.DB_NAME}`);
        connection.release();
    } catch (err) {
        console.error(" MySQL Connection Failed:", err);
    }
}

checkConnection();

export default pool;

