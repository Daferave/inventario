const express = require('express');
const { Router } = require('express');
const TipoEquipo = require('../modelos/TipoEquipo');
const {validarTipoEquipo} = require('../helpers/validar-tipoEquipo')



const router = Router();

router.get('/', async function(req,res){
    try {
        let tipoEquipo = await TipoEquipo.find(); 
        res.send(tipoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

router.post('/', async function(req,res){
    
    try{
        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        console.log('Objeto recibido', req.body);

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();
        
        res.send(tipoEquipo);
   
    } catch(error){
        console.log(error);
        res.send('Ocurrio un error');
    }
}); 
    

router.put('/', async function(req,res){
    try {
        const validaciones = validarTipoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        console.log(req.body, req.params.tipoEquipoId);
       
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (tipoEquipo) {
            return res.status(400).send('Tipo de Equipo no existe');
        }
    
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

       
       tipoEquipo = await tipoEquipo.save();
       res.send(tipoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

module.exports = router;