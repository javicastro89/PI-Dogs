const router = require('express').Router();
const axios = require('axios').default;
const { Breed, Temperament, Breed_Temperament } = require('../db')
const { API_KEY } = process.env
const { Op } = require('sequelize')

// GET /dogs y /dogs?name="..."
router.get('/dogs', (req, res) => {

    const { name } = req.query
    let remoteBreeds = []

    // Verifico si hay busqueda por query
    if (name) {

        axios.get(`https://api.thedogapi.com/v1/breeds/search?api_key=${API_KEY}&q=${name}`)
            .then(async result => {
                remoteBreedsWhitoutImage = result.data

                let remoteBreedsForImage = await axios.get('https://api.thedogapi.com/v1/breeds')

                for(let i of remoteBreedsWhitoutImage) {
                    for(let j = 0; j < remoteBreedsForImage.data.length; j++) {
                        
                        if(remoteBreedsForImage.data[j].name === i.name) {
                            i.image = remoteBreedsForImage.data[j].image
                            remoteBreeds.push(i)

                        }

                    }
                    
                }
               
                if (remoteBreeds.length > 0) {
                    
                    Breed.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } })
                    .then(async (result) => {
                        
                            if (result.length > 0) {
                                let internalTemp = []
                                
                                for (let i of result) {
                                    let fullTemp = await Breed_Temperament.findAll({ where: { BreedId: i.id } })

                                    let onlyTempId = fullTemp.map(e => {
                                        return e.dataValues.TemperamentId
                                    })

                                    let dogTemp = []
                                    for (let j of onlyTempId) {
                                        dogTemp.push(await Temperament.findOne({ where: { id: j } }))
                                    }

                                    let onlyTempName = dogTemp.map(e => {
                                        return e.dataValues.name
                                    })
                                    internalTemp.push({ name: i.name, temp: onlyTempName })
                                }

                                let dogInt = result.map(dog => {
                                    for (let i of internalTemp) {
                                        if (i.name === dog.name) {
                                            return {
                                                name: dog.name,
                                                temperament: i.temp.join(', '),
                                                height: dog.height,
                                                weight: dog.weight,
                                                life_span: dog.life_span,
                                                id: dog.id,
                                                image: dog.image
                                            }

                                        }
                                    }
                                })
                                
                                let dogsExt = remoteBreeds.map(dog => {
                                    return {
                                        name: dog.name,
                                        temperament: dog.temperament,
                                        image: dog.image.url,
                                        height: dog.height.metric,
                                        weight: dog.weight.metric,
                                        life_span: dog.life_span,
                                        id: dog.id
                                    }
                                })

                                return res.json([...dogInt, ...dogsExt])

                            } else {
                                
                                let dogs = remoteBreeds.map(dog => {
                                    
                                    return {
                                        name: dog.name,
                                        temperament: dog.temperament,
                                        image: dog.image.url,
                                        height: dog.height.metric,
                                        weight: dog.weight.metric,
                                        life_span: dog.life_span,
                                        id: dog.id
                                    }
                                })
                                
                                return res.json(dogs)
                            }
                        })
                        .catch((err) => res.status(500).json({ error: 'Error en la búsqueda' }))

                } else {
                    Breed.findAll({ where: { name: { [Op.iLike]: `%${name}%` } } })
                        .then(async (result) => {
                            if (result.length > 0) {
                                let internalTemp = []

                                for (let i of result) {
                                    let fullTemp = await Breed_Temperament.findAll({ where: { BreedId: i.id } })

                                    let onlyTempId = fullTemp.map(e => {
                                        return e.dataValues.TemperamentId
                                    })

                                    let dogTemp = []
                                    for (let j of onlyTempId) {
                                        dogTemp.push(await Temperament.findOne({ where: { id: j } }))
                                    }

                                    let onlyTempName = dogTemp.map(e => {
                                        return e.dataValues.name
                                    })
                                    internalTemp.push({ name: i.name, temp: onlyTempName })
                                }

                                let dogInt = result.map(dog => {
                                    for (let i of internalTemp) {
                                        if (i.name === dog.name) {
                                            return {
                                                name: dog.name,
                                                temperament: i.temp.join(', '),
                                                height: dog.height,
                                                weight: dog.weight,
                                                life_span: dog.life_span,
                                                id: dog.id,
                                                image: dog.image
                                            }

                                        }
                                    }
                                })
                                return res.json(dogInt)
                            } else {
                                return res.status(400).json({ error: 'No existen razas de perros con ese nombre.' })
                            }
                        })
                        .catch((err) => res.status(500).json({ error: 'Ups!! ' }))
                }

            }, () => {
                return res.status(500).json({ error: 'Error en el GET a la API' })
            })

        // Si no hay busqueda por query
    } else {
        axios.get('https://api.thedogapi.com/v1/breeds')
            .then((result) => {
                if (result) {
                    remoteBreeds = result.data
                }

                return Breed.findAll()
            })
            .then(async (result) => {

                if (result.length > 0) {
                    
                    let internalTemp = []

                    for (let i of result) {
                        let fullTemp = await Breed_Temperament.findAll({ where: { BreedId: i.id } })

                        let onlyTempId = fullTemp.map(e => {
                            return e.dataValues.TemperamentId
                        })

                        let dogTemp = []
                        for (let j of onlyTempId) {
                            dogTemp.push(await Temperament.findOne({ where: { id: j } }))
                        }

                        let onlyTempName = dogTemp.map(e => {
                            return e.dataValues.name
                        })
                        internalTemp.push({ name: i.name, temp: onlyTempName })
                        
                    }

                    let dogInt = result.map(dog => {
                        for (let i of internalTemp) {
                            if (i.name === dog.name) {
                                return {
                                    name: dog.name,
                                    temperament: i.temp.join(', '),
                                    height: dog.height,
                                    weight: dog.weight,
                                    life_span: dog.life_span,
                                    id: dog.id,
                                    image: dog.image
                                }

                            }
                        }
                    })
                    
                    if (remoteBreeds) {
                        let dogsExt = remoteBreeds.map(dog => {
                            return {
                                name: dog.name,
                                temperament: dog.temperament,
                                image: dog.image.url,
                                height: dog.height.metric,
                                weight: dog.weight.metric,
                                life_span: dog.life_span,
                                id: dog.id
                            }
                        })

                        return res.json([...dogInt, ...dogsExt])
                    } else {
                        return res.json(dogInt)
                    }
                } else if (remoteBreeds.length > 0) {

                    let dogsExt = remoteBreeds.map(dog => {
                        return {
                            name: dog.name,
                            temperament: dog.temperament,
                            image: dog.image.url,
                            height: dog.height.metric,
                            weight: dog.weight.metric,
                            life_span: dog.life_span,
                            id: dog.id
                        }
                    })

                    return res.json(dogsExt)

                } else {
                    return res.json({ error: 'No se encontraron razas en API ni en BD' })
                }

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


// POST /dog con 1 then y async await
router.post('/dog', (req, res) => {
    const { name, height, weight, life_span, temperament, description } = req.body

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

                let pic = await axios.get('https://dog.ceo/api/breeds/image/random')
                console.log(pic.data.message)

                let newBreed = await Breed.findOrCreate({
                    where: { name: name },
                    defaults: {
                        height: height,
                        weight: weight,
                        life_span: life_span,
                        id: id++,
                        description: description,
                        image: pic.data.message
                    }
                })

                if (newBreed[1]) {

                    while (temperament.length) {
                        let temp = temperament.shift()
                        let arr = await Temperament.findAll({
                            where: {
                                name: { [Op.iLike]: `${temp}%` }
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