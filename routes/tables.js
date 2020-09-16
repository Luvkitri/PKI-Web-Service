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
        res.render('errors/500', {
            displayName: req.user.dataValues.display_name,
            error: error.message
        });
    }
});

// @desc    Execute query and show the result
// @route   POST /tables/query
router.post('/query', ensureAuth, async (req, res) => {
    try {
        const [result, metadata] = await db.query(req.body.query);

        res.render('tables/query', {
            layout: 'main',
            query: req.body.query,
            displayName: req.user.dataValues.display_name,
            result: metadata
        });

    } catch (error) {
        console.error(error.message);
        res.render('errors/500', {
            displayName: req.user.dataValues.display_name,
            error: error.message
        });
    }
});

// @desc    Insert record to table
// @route   POST /tables/insert
router.post('/insert', ensureAuth, async (req, res) => {
    try {
        let data = JSON.parse(JSON.stringify(req.body));
        delete data.table_name;

        const newEntry = models[req.body.table_name].build(data);
        await newEntry.save(); 
        res.status(201).json('OK');
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});

// @desc    Remove record by id from table
// @route   POST /tables/remove
router.post('/remove', ensureAuth, async (req, res) => {
    try {
        if (models[req.body.table_name] == User) {
            const userToRemove = await models[req.body.table_name].findAll({
                where: {
                    id: req.body.tableID 
                }
            });
            
            if (req.user.google_id != userToRemove[0].google_id) {
                await models[req.body.table_name].destroy({
                    where: {
                        id: req.body.tableID
                    }
                });
            } 
        }
        
        res.status(201).json('OK');
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});

// @desc    Edit selected record
// @route   POST /tables/edit
router.post('/edit', ensureAuth, async (req, res) => {
    try {
        let data = JSON.parse(JSON.stringify(req.body));
        delete data.table_name;
        delete data.tableID;

        for (let field in data) {
            if (data[field] === null || data[field] === 'undefined' || data[field] === '') {
                delete data[field];
            }
        }
        
        const model = await models[req.body.table_name].update(data, {
            where: {
                id: req.body.tableID
            }
        });

        res.status(201).json('OK');
    } catch (error) {
        console.error(error.message);
        res.status(500).json(error.message);
    }
});

module.exports = router;