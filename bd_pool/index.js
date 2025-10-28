import express from "express";
import pool from "./db.js";

const PORT = 3000;
const app = express();

app.get("/", async (req, res) => {

    try {
        const [rows] = await pool.query("SELECT * FROM usuarios")
        res.json(rows);
    } catch (error) {
        console.log(error)
        res.status(500).send("Error en el servidor");
    }

});

app.listen(PORT, () => {
  console.log(`App escuchando en el puerto ${PORT}`);
});
