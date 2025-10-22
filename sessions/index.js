import express from "express";
import mysql from "mysql2";
import session from "express-session";

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sessions",
});

conexion.connect((err) => {
  if (err) {
    console.error("Error de conexión a la base de datos:", err);
    return;
  }
  console.log("Conectado a MySQL correctamente");
});

const app = express();
app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "mi clave secreta",
    resave: false,
    saveUninitialized: true,
    rolling: true, // 🔥 renueva la expiración en cada request
    cookie: { maxAge: 1000 * 60 * 10 },
  })
);

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile("login.html", { root: "." });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
  conexion.query(sql, [email, password], (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Ocurrio un error en la base de datos");
    }

    if (results.length > 0) {
      // Usuario válido -> guardamos sesión
      req.session.user = {
        id: results[0].id,
        nombre: results[0].nombre,
        is_admin: results[0].is_admin,
      };
      res.send("Login correcto");

    } else {
      res.send("Usuario o contraseña incorrectos");
    }
  });
});

//Ruta protegida

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/"); // si no está logueado, vuelve al login
  }
  // Si el usuario es administrador (is_admin = 1)
  if (req.session.user.is_admin === 1) {
    return res.sendFile("dashboard_admin.html", { root: "." });
  }

  // Si es usuario normal (is_admin = 0)
  res.sendFile("dashboard_user.html", { root: "." });
});

app.get("/logout", (req, res) => {
  req.session.destroy(err => {
    if(err) {
      return res.send("error al cerrar la sesion")
    }
    res.redirect("/"); //vuelve al login
  })
})

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
