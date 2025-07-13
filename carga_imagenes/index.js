import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.static('.'))
app.use(express.urlencoded({extended:true}));





app.get('/', (req, res) => {
    res.sendFile('index.html', {root : '.'})
})


//Cargando archivos


const storage = multer.diskStorage({
    destination:   (req, file, cb) => {
        cb(null, 'images/')
    },
    filename:  (req, file, cb) =>{
        const nombreUnico = Date.now() + path.extname(file.originalname);
        cb(null, nombreUnico);
    }
});

const upload = multer({ storage: storage });






app.post('/carga_imagen', upload.single('imagen'), (req, res) => {
        const nombre = req.body.nombre
        const mensaje = req.body.textarea;
        console.log(req.file);
        const titulo = req.file.originalname
    res.send( `Mi nombre es ${nombre} y mi mensaje es: ${mensaje}.
            El titulo de la imagen es ${titulo}
        ` );


});



//Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en e puerto ${PORT}`);

})