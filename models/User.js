const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
        google_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        display_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        google_image: {
            type: DataTypes.STRING,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: Date.now
        }
    }, {
        timestamps: false
    }
);

module.exports = User;