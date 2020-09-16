const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

if (typeof process.env.NODE_ENV === 'undefined') {
    // Load env variables
    dotenv.config({ path: './config/.env' });
}

const connectionURL = process.env.DATABASE_URL;

async function checkConnection(sequelize) {
    try {
        await sequelize.authenticate();
        console.log('Connection with database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const sequelize = new Sequelize(connectionURL,
    {
        dialect: 'postgres', 
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        ssl: true,
        logging: false
    }
);

checkConnection(sequelize);
module.exports = sequelize;


/* Using pg module
const { Pool } = require('pg');

const dbConnection = process.env.DATABASE_URL;

if (typeof dbConnection === 'undefined') {
    const pool = new Pool({
        user: 'koeasenmvppynw',
        password: 'affe613a0737c0a04c19f76080c3d7ccfdc24ea0dfc1c23cd696c4bc0422c33e',
        host: 'ec2-46-137-124-19.eu-west-1.compute.amazonaws.com',
        port: 5432,
        database: 'd9oot28ruus4ei',
        ssl: {
            rejectUnauthorized: false
        }
    });
    module.exports = pool;
} else {
    const pool = new Pool({
        connectionString: dbConnection,
        ssl: {
            rejectUnauthorized: false
        }
    });
    module.exports = pool;
}
*/

