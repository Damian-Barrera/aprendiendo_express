import bcrypt from "bcrypt";
import pool from "../dbconfig.js";
import { Router } from "express";
 
const router = Router();
 
router.post("/", async (req, res) => {
  const { nombre, apellido, telefono, sexo, mensaje, password } = req.body;
  const saltRounds = 10;
  const passhashed = await bcrypt.hash(password, saltRounds);

  try {
    await pool.query(
      "INSERT INTO usuarios (nombre, apellido, telefono,genero, is_admin, mensaje, password) VALUES (?,?,?,?,?,?,?)",
      [nombre, apellido, telefono, sexo, 0, mensaje, passhashed],
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al insertar el usuario");
  }
});

export default router;
