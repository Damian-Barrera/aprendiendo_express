import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import usuariosRoutes from "./routes/usuarios.js";
import insertRoutes from "./routes/insert.js";
import ingresarRoutes from "./routes/ingresar.js";
import loginRoutes from "./routes/login.js";
import panelRoutes from "./routes/panel.js";
import logoutRoutes from "./routes/logout.js";
import session from "express-session";

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  session({
    secret: "practicando_con_express",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

//Rutas
app.use("/usuarios", usuariosRoutes);
app.use("/insert", insertRoutes);
app.use("/ingresar", ingresarRoutes);
app.use("/login", loginRoutes);
app.use("/panel", panelRoutes);
app.use("/logout", logoutRoutes);


export function authmiddleware(req, res, next) {
  if (req.session.usuario) {
    return res.send(
      "Ya estas logeado como " +
        req.session.usuario.nombre +
        " <br> " +
        " <a href='/'> Volver </a>" +
        " <br></br>" +
        "O volve a " +
        "<a href='/logout'> Iniciar Sesion </a>",
    );
  }
  next();
}

//Inicio del server
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
