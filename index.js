require('dotenv').config();

const express = require('express');
const cors = require('cors');


//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
require('./database/config')

//Rutas
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/proyecto', require('./routes/proyecto'))
app.use('/api/presupuesto', require('./routes/presupuesto'))
app.use('/api/item', require('./routes/item'))
app.use('/api/material', require('./routes/material'))
app.use('/api/herramienta', require('./routes/herramienta'))
app.use('/api/manoobra', require('./routes/manoObra'))
app.use('/api/todo', require('./routes/busqueda'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})