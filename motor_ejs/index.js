import express from "express";
import pool from "./dbConfig.js";

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.render("index", { datos: rows, mensaje: false });
  } catch (error) {
    res.status(500).render("error", { error: error.message });
  }
});

app.get("/formulario", (req, res) => {
  res.render("formulario");
});

app.post("/formulario", (req, res) => {
  const {nombre, email} = req.body;

  res.send( `Su nombre es ${nombre} y su email es ${email} ` )
})

 


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
