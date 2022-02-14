const express = require('express');
const { ensureAuth } = require('../middlewares/auth');
const Confession = require('../models/Confession');
require('dotenv').config();
const router = express.Router();

router.get('/confessions', async (req, res) => {
    try {
        const confessions = await Confession.find().exec();
        res.json({ confessions, success: true });
    } catch (error) {
        console.log("Error:-", error);
        res.json({ error, success: false });
    }
})

router.get('/confessions/:college', async (req, res) => {
    try {
        const confessions = await Confession.find({ college: req.params.college }).exec();
        res.json({ confessions, success: true });
    } catch (error) {
        console.log("Error:-", error);
        res.json({ error, success: false });
    }
})

module.exports = router;