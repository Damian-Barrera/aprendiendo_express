import express from "express";
import mysql from "mysql2/promise";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));

const dbConfig = {
  host: "localhost",
  user: "root",
  database: "user_admins",
};

// *************

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

// *************

// middleware para proteger rutas
function verificarToken(req, res, next) {
  // el token se enviará en el header Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No autorizado" });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // guardamos info del usuario en req.user
    next();
  } catch (err) {
    res.status(403).json({ error: "Token inválido" });
  }
} 
// ***************

app.get("/protected", verificarToken, (req, res) => {
  res.sendFile("protected.html", {root:"."})
})


app.get("/datos", verificarToken, async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const query = "SELECT * FROM usuarios";
    const [rows] = await connection.execute(query);
    await connection.end();

    const html = rows
      .map((row) => `<p>${row.nombre + " __ " + row.is_admin}</p>`)
      .join("");

    res.send(`
      <html>
        <body>
          <h1>Lista de nombres</h1>
          ${html}
          <script src="/dashboard.js"></script>
        </body>
      </html>
      <button onclick = "history.back()" > Atras </button> 
    `);
  } catch (error) {
    console.log(error);
  }
});

// *************

app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: "." });
});

// ********************************************
//Esto era un ejemplo para cuando iniciara sesion indique si es admin o no.

// // *************
// app.post("/user-login", async (req, res) => {
//   const connection = await mysql.createConnection(dbConfig);

//   try {
//     const { email, password } = req.body;

//     const [result] = await connection.query(
//       "SELECT * FROM usuarios WHERE email = ?",
//       [email]
//     );

//     if (result.length === 0) {
//       return res.send("Usuario no encontrado");
//     }

//     const user = result[0];

//     if (user.password !== password) {
//       return res.send("Contraseña incorrecta");
//     }

//     if (user.is_admin !== 1 ) {
//       return res.send("Logeado como usuario normal ! ")
//     }

//     res.send("Login correcto. Eres Administrador ! ");

//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error en el server!");
//   }finally {
//     await connection.end();
//   }
// });
// ********************************************

// *************  JWT ***********************
//Primero se instalo el paquete jsonwebtoken
//Luego se importo al inicio del archivo con: import jwt from "jsonwebtoken";
//Despues se creo una constante para la clave secreta: const SECRET_KEY = "tu_clave_secreta";
//Luego se modifico el endpoint /login para que genere un token JWT al iniciar sesion correctamente
//Finalmente se creo un nuevo endpoint /protected que requiere un token JWT para acceder


import jwt from "jsonwebtoken";
const JWT_SECRET = "una_clave_muy_larga_y_secreta"; // luego podés moverla a .env

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    await connection.end();

    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

  //  Generando token

  const token = jwt.sign(
    { userId: user.id, nombre: user.nombre, is_admin: user.is_admin },
    JWT_SECRET,
    { expiresIn: "1h" } // el token expira en 1 hora
  );

  res.json({
      message: "Login exitoso",
      token,
      userId: user.id,
      is_admin: user.is_admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});



// *************

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
