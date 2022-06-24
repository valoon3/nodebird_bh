const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Object.key(db).forEach(modelName => {
//   if(db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

try{
  sequelize.authenticate();
  console.log('Connected to database');
} catch (error) {
  console.log('Unable to connect to the database: ', error);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;