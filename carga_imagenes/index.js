import express from "express";
import multer from "multer";
import path from "path";
import mysql from "mysql2/promise";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));

//Database

const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "carga_imagenes",
};

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "." });
});

//Cargando archivos

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + path.extname(file.originalname);
    cb(null, nombreUnico);
  },
});

const upload = multer({ storage: storage });

// Subiendo a la base de datos
app.post("/carga_imagen", upload.single("imagen"), async (req, res) => {
  const nombre = req.body.nombre;
  const mensaje = req.body.textarea;
  const pat_image = `images/${req.file.filename}`;

  console.log(req.file);
  const titulo = req.file.originalname;

  try {
    const connection = await mysql.createConnection(config);
    const query = "INSERT INTO users ( nombre, path, detalles ) VALUES (?,?,?)";
    const [result] = await connection.execute(query, [
      nombre,
      pat_image,
      mensaje,
    ]);
    await connection.end();

    res.send(`Se cargo el archivo ${nombre}. <br> El mensaje es: ${mensaje}. <br>
            El titulo de la imagen es ${titulo} <br>
            <button><a href="/">Volver</a></button>
            <br>
            <button><a href="/ver-imagenes">Ver Imagenes</a></button>
        `);
  } catch (error) {
    console.log(error);
  }
});

//Ver Imagenes

app.get("/ver-imagenes", async (req, res) => {
  try {
    const connection = await mysql.createConnection(config);
    const [rows] = await connection.execute("SELECT * FROM users");
    await connection.end();

    let html = ` 
          <link rel="stylesheet" href="/styles/imagenes.css" />
          <title>Imágenes Subidas</title>

        <h1> Esta son las imagenes de la base de datos</h1>`;
        z
    rows.forEach((row) => {
      html += `
            <div class="image-container">
                <h3>${row.nombre}</h3>
                <img src="${row.path}" alt="${row.nombre}" width="300px" >
             </div>
            <br>
            <hr>
         `;
      html += `<button><a href="/">Volver</a></button>`;
    });

    res.send(html);
  } catch (error) {}
});

//Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en e puerto ${PORT}`);
});
