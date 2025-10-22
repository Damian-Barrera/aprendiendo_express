import { Router } from "express";
const router = Router();
import {join, dirname} from 'path';
import { fileURLToPath } from "url";
 
 const __filename = fileURLToPath(import.meta.url);//Obtiene la ruta completa del archivo actual
 const __dirname = dirname(__filename) // Obtiene la ruta del directorio actual

router.get('/', (req, res) => {
 
    res.sendFile(join(__dirname, '../html/productos.html')) //une la ruta del directorio actual con la ruta relativa al archivo HTML 
 
})

export default router;

 