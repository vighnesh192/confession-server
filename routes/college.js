const express = require('express');
const College = require('../models/College');

const router = express.Router();

router.get('/colleges', async (req, res) => {
    try {
        const colleges = await College.find().exec();
        res.json({ colleges, success: true });
    } catch (error) {
        console.log("Error Colleges GET:-", error);
        res.json({ error, success: false });
    } 
})

module.exports = router;