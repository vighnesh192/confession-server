const express = require('express');
const jwt = require('jsonwebtoken');
const { ensureAuth } = require('../middlewares/auth');
const Confession = require('../models/Confession');
require('dotenv').config();
const GoogleUser = require('../models/Google_User');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    // Get these details from RN after oauth
    const { googleId, firstName, lastName, avatar, email } = req.body;
    console.log("GOOGLE_ID", googleId)

    // Check if the user is present in the DB
    const googleUser = await GoogleUser.findOne({ googleId }).exec();

    // if yes, give the user a token for subsequent protected requests
    if(googleUser) {
        console.log("GOOGLE_USER", googleUser)
        const token = jwt.sign(googleUser.userId.toString(), process.env.SECRET)
        console.log("TOKEN", token)
        res.json({ token, success: true });
    }

    // else, Register the user in the DB and send a token
    else {
        const user = await User.create({ firstName, lastName, avatar, email });
        const newGoogleUser = await GoogleUser.create({ 
            userId: user.id,
            googleId
        })
        const token = jwt.sign(user.id, process.env.SECRET)
        res.json({ token, user, success: true });
    }
})

router.post('/confession', ensureAuth, async (req,res) => {
    try {
        const confession = new Confession(req.body)
        const result = await confession.save();
        res.status(201).send({ result, success: true });
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;