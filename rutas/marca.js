const { request } = require('express');
const { Router } = require('express');
const Marca = require('../modelos/Marca');


const router = Router();

router.get('/', async function(req,res){
    try {
        let marca = await Marca.find(); 
        res.send(marca);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

router.post('/', async function(req,res){
    
    try{
        console.log('Objeto recibido', req.body);

        const existeMarca = await Marca.findOne({nombre: req.body.nombre});
        if (existeMarca){
            return res.send('Marca ya existe');
        }

        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();

        marca = await marca.save();
        
        res.send(marca);
   
    } catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
}); 
    

router.put('/marcaId', async function(req,res){
    try {
        console.log(req.body, req.params.marcaId);
       
        let marca = await Marca.findById(req.params.marcaId);
        if (marca) {
            return res.status(400).send('Marca no existe');
        }
        
       const marcaExiste = await Marca.findOne({ marca: req.body.nombre, _id: { $ne: marca._id } });
       if (marcaExiste) {
           return res.status(400).send('Marca ya existe');
       }

       marca.nombre = req.body.nombre;
       marca.estado = req.body.email;
       marca.fechaActualizacion = new Date();

       
       marca = await marca.save();
       res.send(marca);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

module.exports = router;