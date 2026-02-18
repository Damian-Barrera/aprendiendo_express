import { Router } from "express";
import pool from "../dbconfig.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req, res) => {
  const { apellido, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM usuarios WHERE apellido = ?",
      [apellido],
    );

    if (rows.length === 0) {
      return res.render("ingresar", { error: "Usuario no encontrado" });
    }

    const user = rows[0];
    const passValida = await bcrypt.compare(password, user.password);

    if(!passValida) {
        return res.render("ingresar", { error: "Contraseña incorrecta" });
    }
    //Login correcto
    res.render("panel", { user });

  } catch (error) {
    res.status(500).send("Error al ingresar");
    console.error(error);
  }
});

export default router;