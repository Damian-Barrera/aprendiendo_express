import express from "express";
import multer from "multer";

const app = express();
const PORT = 3000;

app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));

// Multer configuration
// const carga = multer({ dest: "uploads/" }) Esto es para cuando se sube una imagen y se guarda con un nombre aleatorio,
// pero si queremos guardar con el mismo nombre que el archivo original, entonces se hace de la siguiente manera:

const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images"); // Este images es la carpeta donde se guardarán las imágenes subidas, si no existe, se crea automáticamente
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Esto es para guardar el archivo con el mismo nombre que el archivo original,
  },
});

const subiendoArchivo = multer({ storage: almacenamiento });

app.post("/subir", subiendoArchivo.single("archivo"), (req, res) => {
  console.log(req.file);
  res.send("Archivo subido exitosamente");
});
//Para subir multiples archivos :
//No olvidar el atributo multiple en el input del form.

// app.post("/subir", upload.array("fotos", 10), (req, res) => { //Ese  indica el limite de archivos que se pueden subir, en este caso 10
//   console.log(req.files); //Aqui camia file por files. 
// });

// | método     | uso                         |
// | ---------- | --------------------------- |
// | `single()` | un archivo                  |
// | `array()`  | varios archivos mismo input |
// | `fields()` | varios inputs diferentes    |
// | `any()`    | cualquier archivo           |




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
