const express = require('express');
const pool = require('./db.js');
const app = express();

app.use(express.json());

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
    } catch (error) {
        console.error(error.message);
    }
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));