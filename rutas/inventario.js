const { Router } = require('express');
const Inventario = require('../modelos/Inventario');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const inventarios = await Inventario.find().populate([
            { path: 'usuario', select: 'nombre email' },
            { path: 'marca', select: 'nombre' }
        ]); 
        res.send(inventarios);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});


router.post('/', async function(req, res) {
    try {
        console.log(req.body);
        let existeInventario = await Inventario.findOne({ serial: req.body.serial });
    if (existeInventario) {
           return res.status(400).send('Serial ya existe');
       }
        let inventario = new Inventario(); 

        inventario.serial = req.body.serial;
        inventario.modelo = req.body.modelo;
        inventario.descripcion = req.body.descripcion;
        inventario.foto = req.body.foto;
        inventario.color = req.body.color;
        inventario.fechaCompra = req.body.fechaCompra;
        inventario.precio = req.body.precio;
        inventario.usuario = req.body.usuario._id;
        inventario.marca = req.body.marca._id;
        inventario.tipoEquipo = req.body.tipoEquipo._id;
        inventario.estadoEquipo = req.body.estadoEquipo._id;
        inventario.fechaCreacion = new Date();
        inventario.fechaActualizacion = new Date();
       
       inventario = await inventario.save();
       res.send(inventario);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});


router.put('/:inventarioId', async function(req, res) {
    try {
        console.log(req.body, req.params.inventarioId);
       
        let inventario = await Inventario.findById(req.params.inventarioId);
        if (!inventario) {
            return res.status(400).send('Inventario no existe');
        }
        
       
       const invExisteXSerial = await Inventario
                            .findOne({ serial: req.body.serial, _id: { $ne: inventario._id } });
       if (invExisteXSerial) {
           return res.status(400).send('Serial ya existe');
       }

       inventario.serial = req.body.serial;
       inventario.modelo = req.body.modelo;
       inventario.descripcion = req.body.descripcion;
       inventario.foto = req.body.foto;
       inventario.fechaCompra = req.body.fechaCompra;
       inventario.precio = req.body.precio;
       inventario.usuario = req.body.usuario._id;
       inventario.marca = req.body.marca._id;
       inventario.tipoEquipo = req.body.tipoEquipo._id;
       inventario.estadoEquipo = req.body.estadoEquipo._id;
       inventario.fechaActualizacion = new Date();
       
       inventario = await inventario.save();
       res.send(inventario);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

module.exports = router;