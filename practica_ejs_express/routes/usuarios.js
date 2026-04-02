import { Router } from "express";
import pool from "../dbconfig.js";

const router = Router();

router.get("/", async (req, res) => {
  if (!req.session.usuario) {
    return res.redirect("/ingresar");
  } else {
    console.log("Usuario logeado:", req.session.usuario.nombre);
  }

  try {
    const [rows] = await pool.query("select * from usuarios");
    res.render("usuarios", { usuarios: rows });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener los usuarios");
  }
});

export default router;

{
  /* <a href='/'> Volver </a> */
}
