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

                for (let i of remoteBreedsWhitoutImage) {
                    for (let j = 0; j < remoteBreedsForImage.data.length; j++) {

                        if (remoteBreedsForImage.data[j].name === i.name) {
                            i.image = remoteBreedsForImage.data[j].image
                            remoteBreeds.push(i)

                        }

                    }

                }

                let resultBreed = await Breed.findAll({

                    include: Temperament,
                    through: { attributes: [name] },

                    where: {
                        name: {
                            [Op.iLike]: `%${name}%`
                        }
                    }
                })
                let dogInt
                if (resultBreed.length > 0) {

                    let temp
                    dogInt = resultBreed.map(dog => {
                        temp = dog.Temperaments.map(t => {
                            return t.dataValues.name
                        })
                        return {
                            name: dog.name,
                            temperament: temp.join(', '),
                            height: dog.height,
                            weight: dog.weight,
                            life_span: dog.life_span,
                            id: dog.id,
                            image: dog.image
                        }
                    })
                }


                if (remoteBreeds.length > 0) {

                    let dogsExt = remoteBreeds.map(dog => {
                        let arr = dog.weight.metric.split(' - ')

                        let sum
                        if (!arr.includes('NaN')) {
                            sum = arr.reduce((acum, ele) => {
                                return parseInt(acum) + parseInt(ele)
                            })

                        } else if (arr.length === 1 && arr.includes('NaN')) {
                            arr = dog.weight.imperial.split(' – ')
                            sum = arr.reduce((acum, ele) => {
                                return parseInt(acum) + parseInt(ele)
                            })
                            sum = sum / 2.205

                        } else {
                            arr = arr.filter(e => e !== 'NaN')
                            sum = arr.reduce((acum, ele) => {
                                return parseInt(acum) + parseInt(ele)
                            })
                        }

                        let prom = sum / arr.length

                        return {
                            name: dog.name,
                            temperament: dog.temperament,
                            image: dog.image.url,
                            height: dog.height.metric,
                            weight: prom,
                            life_span: dog.life_span,
                            id: dog.id
                        }
                    })
                    if (dogInt) {

                        return res.json([...dogInt, ...dogsExt])
                    } else {
                        return res.json(dogsExt)
                    }

                } else {

                    if (resultBreed.length > 0) {

                        return res.json(dogInt)
                    } else {
                        return res.status(400).json({ error: 'No existen razas de perros con ese nombre.' })
                    }

                }

            }, () => {
                return res.status(500).json({ error: 'Error en el GET a la API' })
            })

        // Si no hay busqueda por query
    } else {
        axios.get('https://api.thedogapi.com/v1/breeds')
            .then(async (result) => {
                if (result) {
                    remoteBreeds = result.data
                }

                let resultBreed = await Breed.findAll({
                    include: Temperament,
                    through: { attributes: [name] }
                })

                let dogInt
                if (resultBreed.length > 0) {

                    let temp
                    dogInt = resultBreed.map(dog => {
                        temp = dog.dataValues.Temperaments.map(t => {
                            return t.dataValues.name
                        })

                        return {
                            name: dog.dataValues.name,
                            temperament: temp.join(', '),
                            height: dog.dataValues.height,
                            weight: dog.dataValues.weight,
                            life_span: dog.dataValues.life_span,
                            id: dog.dataValues.id,
                            image: dog.dataValues.image
                        }
                    })
                }

                if (remoteBreeds.length > 0) {
                    let dogsExt = remoteBreeds.map(dog => {
                        let arr = dog.weight.metric.split(' - ')

                        let sum
                        if (!arr.includes('NaN')) {
                            sum = arr.reduce((acum, ele) => {
                                return parseInt(acum) + parseInt(ele)
                            })

                        } else if (arr.length === 1 && arr.includes('NaN')) {
                            arr = dog.weight.imperial.split(' – ')
                            sum = arr.reduce((acum, ele) => {
                                return parseInt(acum) + parseInt(ele)
                            })
                            sum = sum / 2.205

                        } else {
                            arr = arr.filter(e => e !== 'NaN')
                            sum = arr.reduce((acum, ele) => {
                                return parseInt(acum) + parseInt(ele)
                            })
                        }

                        let prom = sum / arr.length

                        return {
                            name: dog.name,
                            temperament: dog.temperament,
                            image: dog.image.url,
                            height: dog.height.metric,
                            weight: prom,
                            life_span: dog.life_span,
                            id: dog.id
                        }
                    })
                    if (dogInt) {
                        return res.json([...dogInt, ...dogsExt])

                    } else {
                        return res.json(dogsExt)
                    }

                } else {
                    if (resultBreed.length > 0) {
                        return res.json(dogInt)

                    } else {
                        return res.json({ error: 'No se encontraron razas en API ni en BD' })
                    }
                }
            })
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
            if (breed) {

                let arr = breed.weight.metric.split(' - ')

                let sum
                if (!arr.includes('NaN')) {

                    sum = arr.reduce((acum, ele) => {
                        return parseInt(acum) + parseInt(ele)
                    })

                } else if (arr.length === 1 && arr.includes('NaN')) {
                    arr = dog.weight.imperial.split(' – ')
                    sum = arr.reduce((acum, ele) => {
                        return parseInt(acum) + parseInt(ele)
                    })
                    sum = sum / 2.205

                } else {
                    arr = arr.filter(e => e !== 'NaN')
                    sum = arr.reduce((acum, ele) => {
                        return parseInt(acum) + parseInt(ele)
                    })
                }

                let prom = sum / arr.length

                let dogExt = {
                    name: breed.name,
                    temperament: breed.temperament,
                    image: breed.image.url,
                    height: breed.height.metric,
                    weight: prom,
                    life_span: breed.life_span,
                    id: breed.id
                }

                return res.json(dogExt)
            }

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
                        let element = temperament.shift()
                        let temp = await Temperament.findAll({
                            where: {
                                name: { [Op.iLike]: `${element}%` }
                            }
                        })
                        await newBreed[0].addTemperaments(temp)
                    }
                }
                return res.json(newBreed)
            })
            .catch(() => res.status(500).json({ error: 'Error en la reques a la API' }))

    } else {
        return res.status(400).json({ error: 'Debes incluir todos los campos para crear la raza.' })
    }
})


module.exports = router;