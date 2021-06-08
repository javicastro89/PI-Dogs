const { Router } = require('express');
const axios = require('axios')
const { Breed } = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



module.exports = {
    dogs: require('./dogs'),
    temperament: require('./temperament'),
    index: router
}
    // breed: require('./breed')
    ;
