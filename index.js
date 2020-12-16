require('dotenv').config();

const express = require('express');
const cors = require('cors');


//Crear el servidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Base de datos
require('./database/config')

//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "hola mundo"
    })
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})