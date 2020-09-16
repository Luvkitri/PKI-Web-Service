const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');
const db = require('./config/db.js');
const morgan = require('morgan');

// Load env variables
dotenv.config({ path: './config/.env' });

// Load passport
require('./config/passport')(passport);

const app = express();

// * Middleware

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

// Passport
app.use(passport.initialize());
app.use(passport.session())

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

// This allows to extrat form-data from POST request
app.use(express.urlencoded({
    extended: true
}));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/tables', require('./routes/tables'));

/* OLD ROUTES
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

app.post('/view/insert', async (req, res) => {
    try {
        const recordData = req.body;
        let fields = '';
        let data = '';

        for (const [key, value] of Object.entries(recordData.content)) {
            fields += `${key}, `;
            if (key == 'date_of_birth') {
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

app.post('/view/edit', async (req, res) => {
    try {
        const updateData = req.body;
        setArguments = '';

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
*/

// Server start
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));