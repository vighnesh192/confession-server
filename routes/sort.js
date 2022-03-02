const express = require('express');
const Soritng = require('../models/Soritng')

const router = express.Router();

router.get('/sorts', async(req,res) =>{
    try {
        const sorts = await Soritng.find().exec();
        res.json({sorts, success:true})
    } catch (error) {
        console.log('Error:', error);
        res.json({sorts,success:false}) 
    }
})
module.exports =router;
