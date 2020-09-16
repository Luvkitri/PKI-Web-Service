const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Car = db.define('car', {
        brand: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        model: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        year: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(19, 2),
            allowNull: false
        }
    }, {
        timestamps: false
    }
);

module.exports = Car;

//const Owner = require('./Owner');