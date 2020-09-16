const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const Owner = db.define('owner', {
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false
        },
        country_of_birth: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        timestamps: false
    }
);

module.exports = Owner;

const Car = require('./Car');

Owner.hasMany(Car, { foreignKey: 'owner_id' });

