const express = require('express');
const { getConnection } = require ('./db/db-connection-mongo');


const app = express();


getConnection();

app.use(express.json());

app.use('/usuario', require('./rutas/usuario')); 
app.use('/estado-equipo', require('./rutas/estadoEquipo')); 
app.use('/marca', require('./rutas/marca')); 
app.use('/tipo-equipo', require('./rutas/tipoEquipo')); 
app.use('/inventario', require('./rutas/inventario')); 

app.listen(3000, function() {
    console.log('Aplicacion corriendo en el puerto 3000');
});


