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
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})