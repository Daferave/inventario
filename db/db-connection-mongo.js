const mongoose = require('mongoose');

const getConnection = async () => {

    try{
        console.log('Llamando Base de datos');
        const url = 'mongodb://daferave:R4m1r3z88@cluster0-shard-00-00.5aorf.mongodb.net:27017,cluster0-shard-00-01.5aorf.mongodb.net:27017,cluster0-shard-00-02.5aorf.mongodb.net:27017/Inventario?ssl=true&replicaSet=atlas-kglzu4-shard-0&authSource=admin&retryWrites=true&w=majority';
        await mongoose.connect(url);
        console.log ('Conexión exitosa');
    }catch{
        console.log('Error de Conexión');
    }
}

module.exports = {
    getConnection,
}