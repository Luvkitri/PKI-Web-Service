const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const db = require('../config/db');
const User = require('../models/User');
const Car = require('../models/Car');
const Owner = require('../models/Owner');

const models = {
    "users": User,
    "cars": Car,
    "owners": Owner 
};

// @desc    Show view page
// @route   GET /tables/view
router.get('/view', ensureAuth, (req, res) => {
    res.render('tables/view', {
        layout: 'main',
        displayName: req.user.dataValues.display_name
    });
});

// @desc    Show table content
// @route   POST /tables/table
router.post('/table', ensureAuth, async (req, res) => {
    try {
        const result = await models[req.body.table].findAll();

        res.render('tables/view', {
            layout: 'main',
            displayName: req.user.dataValues.display_name,
            table: result,
            tableName: req.body.table
        });
    } catch (error) {
        console.error(error.message);
    }
});

// @desc    Execute query and show the result
// @route   POST /tables/query
router.post('/query', ensureAuth, async (req, res) => {
    try {
        console.log(req.body.query);
        const [result, metadata] = await db.query(req.body.query);

        console.log(result)
        res.render('tables/query', {
            layout: 'main',
            displayName: req.user.dataValues.display_name,
            result: metadata
        });
    } catch (error) {
        console.error(error.message);
    }
})

module.exports = router;