import express from 'express';
import fs from 'fs';



const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send(" <button> <a href='/createDir'> Crear Carpeta </a> </button> ")
})

app.get( "/createDir", (req, res) => {
     fs.mkdir("carpeta nueva",(err) => {
        if(err){
            res.send("Error al crear la carpeta")
        }else {
            res.send("carpeta creada con exito")
        }

        fs.writeFile("carpeta nueva/archivito.txt", "Este es el contenido del archivo", (err) => {
            if(err){
                res.send("Hubo un error al crear el archivo")
            }else {
                res.send("ARchivo creado con exito")
            }
        })

     })
    })



app.listen(port, () => {
    console.log('Servidor corriendo correctamente')
})
 