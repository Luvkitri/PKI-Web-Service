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
let hbs = exphbs.create({});

hbs.handlebars.registerHelper('ifNotEquals', function(arg1, arg2, options) {
    exclusiveKeywords = arg2.split(' ');
    return (arg1 != exclusiveKeywords[0] && arg1 != exclusiveKeywords[1]) ? options.fn(this) : options.inverse(this);
});

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

// This allows to extrat form-data from POST request
app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());


// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/tables', require('./routes/tables'));

// Server start
const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on port ${port}...`));