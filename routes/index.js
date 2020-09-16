const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const db = require('../config/db');

router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

router.get('/sign-in', (req, res) => {
    res.render('signin', {
        layout: 'login'
    });
});

router.get('/home', ensureAuth, async (req, res) => {
    try {
        const tables = await db.query(
            `SELECT table_name FROM information_schema.tables 
            WHERE table_schema='public' AND table_type='BASE TABLE';`
        );

        res.render('home', {
            displayName: req.user.dataValues.display_name,
            tables: tables,
            layout: 'main'
        });
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;