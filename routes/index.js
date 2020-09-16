const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');
const db = require('../config/db');

let query = '';

// @desc    Show login page
// @route   GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    });
});

// @desc    Show failure page on failed login
// @route   GET /failure
router.get('/failure', (req, res) => {
    res.render('failure', {
        layout: 'login'
    });
});

// @desc    Show hompage
// @route   GET /home
router.get('/home', ensureAuth, async (req, res) => {
    try {
        const tables = await db.query(
            `SELECT table_name FROM information_schema.tables 
            WHERE table_schema='public' AND table_type='BASE TABLE';`
        );

        res.render('home', {
            displayName: req.user.dataValues.display_name,
            tables: tables,
            query: query,
            layout: 'main'
        });
    } catch (error) {
        console.error(error.message);
    }
});

// @desc    Show hompage with query intact
// @route   POST /home
router.post('/home', ensureAuth, async (req, res) => {
    try {
        query = req.body.query;
        res.json('OK');
    } catch (error) {
        console.error(error.message);
    }
});

module.exports = router;