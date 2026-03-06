import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const PORT = 3000;


app.use(express.static("."));
app.use(express.urlencoded({ extended: true }));


// Multer configuration
// const carga = multer({ dest: "uploads/" })

const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "images");
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
})

const subiendoArchivo = multer({ storage:  almacenamiento})

app.post("/subir", subiendoArchivo.single("archivo"), (req, res) => {
  console.log(req.file)
  res.send("Archivo subido exitosamente");
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
