import express from 'express';
import { Router } from 'express';
import usuariosRoutes from './routes/usuarios.js';
import productosRoutes from './routes/productos.js';
import lugaresRoutes from './routes/lugares.js';

const PORT = 3000;

const app = express()
const router = Router();

app.use(express.static('.'))

app.get('/' , (req, res) => {
    res.sendFile('index.html', {root: '.'})
})

app.use("/usuarios", usuariosRoutes);
app.use("/productos", productosRoutes);
app.use("/lugares", lugaresRoutes);



app.listen(PORT, () => {
    console.log(`Aplicacion corriendo normalemnte en el puerto ${PORT}`)
})
