const express = require('express');
const { Router } = require('express');
const EstadoEquipo = require('../modelos/EstadoEquipo');
const {validarEstadoEquipo} = require('../helpers/validar-estadoEquipo');
const router = Router();

router.get('/', async function(req,res){
    try {
        let estadoEquipo = await EstadoEquipo.find(); 
        res.send(estadoEquipo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

router.post('/', async function(req,res){
    
    try{
        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        console.log('Objeto recibido', req.body);

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        
        res.send(estadoEquipo);
   
    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error en servidor');
    }
}); 
    

router.put('/', async function(req,res){
    try {
        const validaciones = validarEstadoEquipo(req);

        if (validaciones.length > 0){
            return res.status(400).send(validaciones);
        }
        console.log(req.body, req.params.tipoEquipoId);
       
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if (tipoEquipo) {
            return res.status(400).send('Estado de Equipo no existe');
        }
    
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

       
        estadoEquipo = await estadoEquipo.save();
       res.send(estadoEquipoo);
    } catch (error) {
       console.log(error);
       res.status(500).send('Ocurrio un error en servidor');
    }
});

module.exports = router;