const express = require('express');
const { getConnection } = require ('./db/db-connection-mongo');
require('dotenv').config();
const cors = require('cors')



const app = express();
const port = process.env.PORT;

app.use(cors())

getConnection();

app.use(express.json());

app.use('/usuario', require('./rutas/usuario')); 
app.use('/estado-equipo', require('./rutas/estadoEquipo')); 
app.use('/marca', require('./rutas/marca')); 
app.use('/tipo-equipo', require('./rutas/tipoEquipo')); 
app.use('/inventario', require('./rutas/inventario')); 

app.listen(port, () => {
    console.log(`Aplicacion corriendo en el puerto ${port}`)
});