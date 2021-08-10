//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Temperament, Breed } = require('./src/db.js');
const { v1: uuidv1 } = require('uuid');
const axios = require('axios').default;


// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  // server.listen(3001, () => {
  //   console.log('%s listening at 3001'); // eslint-disable-line no-console
  server.listen(process.env.PORT, () => {
    console.log("%s listening at 3000"); // eslint-disable-line no-console
    // Cargar los temperamentos de la base de datos apenas se sincroniza
    axios.get('https://api.thedogapi.com/v1/breeds')
      .then(result => {

        let temp = result.data.map(e => {
          if (e.temperament) {
            return e.temperament.split(', ')
          }
        })
        let temperament = []

        temp.map(array => {
          if (Array.isArray(array)) {
            array.map(e => {
              if (!temperament.includes(e)) {
                temperament.push(e)
              }
            })

          } else if (!temperament.includes(array) && array) {
            temperament.push(array)
          }
        })

        temperament.sort()
        temperament.map(async e => {
          try {
            await Temperament.create({
              name: e,
              id: uuidv1()
            })

          } catch (e) {
            console.log('No se creó el temperamento')
          }
        })

        console.log("Temperamentos precargados");

      })

      .catch(err => { console.log('No se cargaron los Temperamentos') })
  });
});
