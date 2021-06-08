const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Breed', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    years: {
      type: DataTypes.INTEGER
    }
  });
  sequelize.define('Temperament', {
    name: {
      type: DataTypes.STRING
    },
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    }
  })
};



