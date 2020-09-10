const express = require('express');
const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!!!');
// Routes

// Get all tables
app.get('/tables', async (req, res) => {
    try {
        let tables = await pool.query(
            `SELECT table_name FROM information_schema.tables 
            WHERE table_schema='public' AND table_type='BASE TABLE';`
        );
        
        res.json(tables.rows);
    } catch (err) {
        console.error(err.message);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));