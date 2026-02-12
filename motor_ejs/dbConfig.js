import mysql from 'mysql2/promise';


const pool = mysql.createPool( {
    host: 'localhost',
    port : '3306',
    user: 'admin',
    password: '1234',
    database: 'muchos_usuarios',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
} );

export default pool;;