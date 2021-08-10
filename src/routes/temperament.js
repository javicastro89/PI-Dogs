const router = require('express').Router();
const axios = require('axios').default;
const { Temperament } = require('../db')
const {v1: uuidv1} = require('uuid')

// GET /temperament
router.get('/temperament', async (req, res) => {
    try {
    let temper = await Temperament.findAll({attributes: ['name', 'id']})
    // console.log(temper)
    res.json(temper)

    } catch(e) {
        res.status(500).json({ error: 'Ups!! ' })
    }

})


module.exports = router;