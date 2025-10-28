// db.js
import mysql from "mysql2/promise";

// Creamos el pool de conexiones
const pool = mysql.createPool({
  host: "localhost",
  user: "root",        // tu usuario
  password: "", // tu contraseña
  database: "bd_pool",
  waitForConnections: true, // espera si no hay conexiones disponibles
  connectionLimit: 10, // máximo de conexiones simultáneas
  queueLimit: 0 // sin límite de espera
});

// Exportamos el pool para usarlo en otras partes
export default pool;
