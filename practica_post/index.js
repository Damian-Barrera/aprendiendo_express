import express from 'express';

const app = express();

const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));
app.use(express.json());


app.get('/', (req,res) => {
    res.sendFile('index.html', {root: "."})
})

app.post('/datos', (req,res) => {
    const {nombre, apellido, telefono} = req.body;  
    res.json({nombre, apellido, telefono})
     
})


app.listen(PORT, ()=> {
    console.log("Server escuchando en el puerto 3000")
})