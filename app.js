const express = require('express');
const dotenv = require('dotenv');
const pool = require('./config/db.js');
const morgan = require('morgan');
const app = express();

dotenv.config({ path: './config/config.env' });
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// Routes

// Get all tables
app.get('/tables', async (req, res) => {
    try {
        const tables = await pool.query(
            `SELECT table_name FROM information_schema.tables 
            WHERE table_schema='public' AND table_type='BASE TABLE';`
        );

        res.json(tables.rows);
    } catch (error) {
        console.error(error.message);
        res.json(error.message);
    }
});

// Post table content
app.post('/table', async (req, res) => {
    try {
        const { table_name } = req.body;
        const table_records = await pool.query(
            `SELECT * FROM ${[table_name]};`
        );

        res.json(table_records.rows);
    } catch (error) {
        console.error(error.message);
        res.json(error.message);
    }
});

// Post query
app.post('/query', async (req, res) => {
    try {
        const { query } = req.body;
        const queryResult = await pool.query(
            query
        );

        res.json(queryResult.rows);
    } catch (error) {
        console.error(error.message);
        res.json(error.message);
    }
});

// Post new record
app.post('/view/insert', async (req, res) => {
    try {
        const recordData = req.body;
        let fields = "";
        let data = "";

        for (const [key, value] of Object.entries(recordData.content)) {
            fields += `${key}, `;
            if (key == "date_of_birth") {
                data += `DATE '${value}', `; 
            } else {
                data += `'${value}', `;  
            }
        }

        fields = fields.slice(0, -2);
        data = data.slice(0, -2);

        const insertResult = await pool.query(
            `INSERT INTO ${recordData.table} (${fields}) VALUES(${data}) RETURNING *;`
        );
        
        res.json(insertResult.rows);
    } catch (error) {
        console.error(error.message);
        res.json(error.message);
    }
});

// Delete record
app.post('/view/delete', async (req, res) => {
    try {
        const deleteData = req.body;

        const deleteResult = await pool.query(
            `DELETE FROM ${deleteData.table} WHERE id = ${deleteData.id};`    
        );

        res.json(`Record with id: ${deleteData.id} was deleted from ${deleteData.table}`);
    } catch(error) {
        console.error(error.message);
        res.json(error.message);
    }
});

// Edit record
app.post('/view/edit', async (req, res) => {
    try {
        const updateData = req.body;
        setArguments = "";

        for (const [key, value] of Object.entries(updateData.edited)) {
            setArguments += `${key} = '${value}', `;
        }

        setArguments = setArguments.slice(0, -2);

        const editResult = await pool.query(
            `UPDATE ${updateData.table} SET ${setArguments} WHERE id = ${updateData.id};`
        );

        res.json(`Record with id: ${updateData.id} was updated in ${updateData.table}`);
    } catch (error) {
        console.error(error.message);
        res.json(error.message);
    }
});

// Server start
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));