import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const PORT = 3000;
const app = express();

app.use(express.static("."));
app.use(express.urlencoded({ extended: true })); // Para poder recibir datos del formulario

// Conexion a base de datos mysql
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "usuarios_prueba",
};

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

app.get("/formulario", (req, res) => {
  res.sendFile("formulario.html", { root: "." });
});

app.post("/respuestadelformulario", async (req, res) => {
  const nombre = req.body.nombre?.trim();
  const apellido = req.body.apellido?.trim();
  const telefono = req.body.telefono?.trim();
  const email = req.body.email?.trim();
  const password = req.body.password?.trim();
  const textarea = req.body.textarea?.trim();

  if (!nombre || !apellido || !telefono || !email || !password || !textarea) {
    return res.status(400).send("Faltan datos por completar");
  } else {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      const query =
        "INSERT INTO usuarios (nombre, apellido, telefono, email, password, mensaje) VALUES (?,?,?,?,?,?)";
      const connection = await mysql.createConnection(dbConfig);
      await connection.execute(query, [
        nombre,
        apellido,
        telefono,
        email,
        hash,
        textarea,
      ]);
      await connection.end();
      res.redirect("/mostrando-datos");
      // res.send(
      //   ` 
      //   <p> Nombre : ${nombre} </p>
      //   <p> Apellido ${apellido} </p>
      //   <p> Telefono: ${telefono} </p>
      //   <p> Email: ${email} </p>
      //   <p> Contraseña: ${password} </p>
      //   <p> Mensaje: ${textarea} </p>
      // <a href="/" > Volver al inicio </a>
      // `
      // );
    } catch (error) {
      console.error("Error al guardar en la base de datos:", error.message);
      res.status(500).send("<h1>Ocurrió un error al guardar los datos.</h1>");
    }
  }
});
//Prueba uno
// app.post('/datos', (req, res) => {
//     const {nombre, email,apellido} = req.body;
//     console.log(req.path);

//     res.send(`
//             <h2> Datos Recibidos </h2>
//             <p>Nombre: ${nombre}</p>
//             <p>Apellido: ${apellido}</p>
//             <p>Email: ${email}</p>
//             <a href="/">Volver</a>
//         `)
// })

//Prueba dos
app.post("/datos", async (req, res) => {
  const nombre = req.body.nombre.trim();
  const apellido = req.body.apellido.trim();
  const email = req.body.email.trim();

  if (!nombre || !email || !apellido) {
    return res.status(400).send("Faltan datos por completar");
  } else {
    const connection = await mysql.createConnection(dbConfig);
    const query =
      "INSERT INTO usuarios (nombre, apellido, email) VALUES (?,?,?)";
    const [result] = await connection.execute(query, [nombre, apellido, email]);
    await connection.end();

    res.send(`Los datos se cargaron correctamente (creo) y entraron en el else.. 
              </br>
              </br>
            <a href = "/" > Volver al inicio </a>`);
  }
});

app.get("/listar", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const query = "SELECT * FROM usuarios";
  const [rows] = await connection.execute(query);
  await connection.end();

  let result = "<h2>Lista de Usuarios</h2>";

  result += `<a href="/">Volver</a>`;
  rows.forEach((row) => {
    console.log(row.id);
    result += `
    <p>Nombre : ${row.nombre}</p>
    <p>Apellido : ${row.apellido}</p>
    <p>Email : ${row.email}</p>
    </br>
    `;
  });

  res.send(result);
});

app.get("/base", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const nombre = "flor";
  const apellido = "melian";
  const email = "flor@gmail.com";

  const query =
    "INSERT INTO usuarios (nombre, apellido, email) VALUES (?, ?, ?)";
  const [resultado] = await connection.execute(query, [
    nombre,
    apellido,
    email,
  ]);
  await connection.end();

  res.send("Los datos se han insertado correctamente");
});

//Consultando los datos

app.get("/mostrando-datos", async (req, res) => {
  const query = "SELECT * FROM usuarios";

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(query);
    await connection.end();

    // Armamos el HTML
    let html = `
      <h1>Listado de Usuarios</h1>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
    `;

    rows.forEach(user => {
      html += `
        <tr>
          <td>${user.id}</td>
          <td>${user.nombre}</td>
          <td>${user.apellido}</td>
          <td>${user.telefono}</td>
          <td>${user.email}</td>
          <td>${user.mensaje}</td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
      <br>
      <a href="/">Volver al inicio</a>
    `;

    res.send(html);

  } catch (error) {
    console.error("Error al obtener los datos:", error.message);
    res.status(500).send("Error al obtener los datos de la base de datos.");
  }
});


//Iniciando el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
