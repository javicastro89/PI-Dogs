const router = require('express').Router();
const axios = require('axios').default;
const { Breed, Temperament } = require('../db')
const { API_KEY } = process.env
const { Op } = require('sequelize')

// GET /dogs y /dogs?name="..."
router.get('/dogs', (req, res) => {

    const { name } = req.query
    let remoteBreeds;

    // Verifico si hay busqueda por query
    if (name) {

        axios.get(`https://api.thedogapi.com/v1/breeds/search?api_key=${API_KEY}&q=${name}`)
            .then(result => {
                remoteBreeds = result.data

                if (remoteBreeds.length > 0) {
                    if (remoteBreeds.length < 8) {
                        Breed.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } })
                            .then((result) => {
                                console.log(result, 'A ver que onda')
                                if (result) {
                                    let dogs = [...remoteBreeds, ...result].slice(0, 8).map(dog => {
                                        return {
                                            name: dog.name,
                                            temperament: dog.temperament,
                                            image: dog.image,
                                            height: dog.height.metric,
                                            weight: dog.weight.metric,
                                            life_span: dog.life_span
                                        }
                                    })
                                    return res.json(dogs)
                                } else {

                                    let dogs = [...remoteBreeds].slice(0, 8).map(dog => {
                                        return {
                                            name: dog.name,
                                            temperament: dog.temperament,
                                            image: dog.image,
                                            height: dog.height.metric,
                                            weight: dog.weight.metric,
                                            life_span: dog.life_span
                                        }
                                    })
                                    return res.json(dogs)
                                }
                            })
                            .catch((err) => res.status(500).json({ error: 'Ups!! ' }))

                    } else {
                        let dogs = [...remoteBreeds].slice(0, 8).map(dog => {
                            return {
                                name: dog.name,
                                temperament: dog.temperament,
                                image: dog.image,
                                height: dog.height.metric,
                                weight: dog.weight.metric,
                                life_span: dog.life_span
                            }
                        })
                        return res.json(dogs)
                    }


                } else {
                    Breed.findAll({ where: { name: { [Op.like]: `%${name}%` } } })
                        .then((result) => {
                            if (result.length > 0) {
                                return res.json([...result].slice(0, 8))
                            } else {
                                return res.status(400).json({ error: 'No existen razas de perros con ese nombre.' })
                            }
                        })
                        .catch((err) => res.status(500).json({ error: 'Ups!! ' }))
                }

            }, () => {
                return res.status(500).json({ error: 'Ups!! ' })
            })

        // Si no hay busqueda por query
    } else {
        axios.get('https://api.thedogapi.com/v1/breeds')
            .then((result) => {
                remoteBreeds = result.data
                return Breed.findAll()
            })
            .then((result) => {
                let dogs = [...remoteBreeds, ...result].slice(0, 8)
                dogs = dogs.map(dog => {
                    return {
                        name: dog.name,
                        temperament: dog.temperament,
                        image: dog.image
                    }
                })

                return res.json(dogs)
            })
            .catch((err) => res.status(500).json({ error: 'Ups!! ' }))
    }

})


// GET /dogs/{idRaza}
router.get('/dogs/:idRaza', (req, res) => {

    const { idRaza } = req.params

    if (isNaN(idRaza)) return res.status(400).json({ error: 'Debe ingresar un id numérico' })

    axios.get('https://api.thedogapi.com/v1/breeds')
        .then(result => {

            let remoteBreeds = result.data
            let breed = remoteBreeds.find(dog => dog.id === parseInt(idRaza))
            if (breed) return res.json(breed)

            Breed.findByPk(parseInt(idRaza))
                .then(result => {
                    if (result) return res.json(result)
                    return res.status(400).json({ error: `No existe raza con el id: ${idRaza}` })
                })

        })
        .catch(err => res.status(500).json({ error: 'Ups!! ' }))
})

// Función para no pisar id
let id
(async () => {
    let externalDogs = await axios.get('https://api.thedogapi.com/v1/breeds')

    let idExt = externalDogs.data.map(e => {
        return {
            id: e.id
        }
    })

    let idExtFinal = idExt[idExt.length - 1].id

    id = ++idExtFinal

    while (await Breed.findByPk(id)) {
        id++
    }
})()


// POST /dog con 3 then()
// router.post('/dog', (req, res) => {
//     const { name, height, weight, life_span, temperament } = req.body

//     if (name && name !== '' && height && height !== '' && weight && weight !== '' && life_span && life_span !== '') {
//         axios.get('https://api.thedogapi.com/v1/breeds')
//             .then(result => {
//                 let externalDogs = result.data.map(e => {
//                     return {
//                         name: e.name
//                     }
//                 })

//                 let external = externalDogs.find(e => e.name === name)

//                 if (external) {
//                     return res.status(400).json({ error: 'Esa raza de perro ya existe.' })
//                 }

//                 if (temperament.length < 1) {
//                     return res.status(400).json({ error: 'Tienes que cargar al menos 1 temperamento.' })
//                 }

//                 Temperament.findAll()
//                 .then(result => {
//                     let names = result.map(e => {
//                         return e.dataValues.name
//                     })

//                     temperament.map(e => {
//                         if(!names.includes(e)) {
//                             return res.status(400).json({ error: `El temperamento ${e} no existe.` })
//                         }
//                     })
//                     Breed.findOrCreate({
//                     // Breed.create({
//                         where: { name: name },
//                         defaults: {
//                             // name: name,
//                             height: height,
//                             weight: weight,
//                             life_span: life_span,
//                             // temperament: temperament.join(', '),
//                             id: id++
//                         }
//                     })
//                         .then(async result => {
//                             while(temperament.length) {
//                                 let algo = temperament.shift()
//                                 let arr = await Temperament.findAll({
//                                      where: {
//                                           name: { [Op.iLike]: `${algo}` } 
//                                         } 
//                                     })
//                                 await result[0].addTemperaments(arr)

//                             }
//                             return res.json(result)

//                         }, (e) =>  res.status(500).json(console.log('FindOrCreate')))


//                 }, (e) =>  res.status(500).json(console.log('FindAll')))


//             }, (e) => res.status(500).json({ error: 'Ups!!' }))
//     }
// })


// POST /dog con 1 then y async await
router.post('/dog', (req, res) => {
    const { name, height, weight, life_span, temperament } = req.body

    if (name && name !== '' && height && height !== '' && weight && weight !== '' && life_span && life_span !== '') {
        axios.get('https://api.thedogapi.com/v1/breeds')
            .then(async result => {

                let externalDogs = result.data.map(e => {
                    return {
                        name: e.name
                    }
                })

                let external = externalDogs.find(e => e.name === name)

                if (external) {
                    return res.status(400).json({ error: 'Esa raza de perro ya existe.' })
                }

                if (temperament.length < 1) {
                    return res.status(400).json({ error: 'Tienes que cargar al menos 1 temperamento.' })
                }


                let resultTemp = await Temperament.findAll()
                let names = resultTemp.map(e => {
                    return e.dataValues.name
                })

                for (let i = 0; i < temperament.length; i++) {
                    if (!names.includes(temperament[i])) {
                        return res.status(400).json({ error: `El temperamento ${temperament[i]} no existe.` })
                    }
                }

                let newBreed = await Breed.findOrCreate({
                    where: { name: name },
                    defaults: {
                        height: height,
                        weight: weight,
                        life_span: life_span,
                        id: id++
                    }
                })

                if (newBreed[1]) {
                    while (temperament.length) {
                        let algo = temperament.shift()
                        let arr = await Temperament.findAll({
                            where: {
                                name: { [Op.iLike]: `${algo}` }
                            }
                        })
                        await newBreed[0].addTemperaments(arr)
                    }
                }
                return res.json(newBreed)
            })
            .catch(() => res.status(500).json({ error: 'Ups!!' }))

    } else {
        return res.status(400).json({ error: 'Debes incluir todos los campos para crear la raza.' })
    }
})


module.exports = router;