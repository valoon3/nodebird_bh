const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('mysql://localhost:3306/board', 'root', '1234',
    {
        dialect: 'mysql',
    }
);