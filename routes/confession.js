const express = require('express');
const jwt = require('jsonwebtoken');
const { ensureAuth } = require('../middlewares/auth');
const Confession = require('../models/Confession');
require('dotenv').config();
const GoogleUser = require('../models/Google_User');
const User = require('../models/User');
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

module.exports = router;