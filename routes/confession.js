const express = require('express');
const req = require('express/lib/request');
const { ensureAuth } = require('../middlewares/auth');
const Confession = require('../models/Confession');
const Likes_Dislikes = require('../models/Likes_Dislikes');
require('dotenv').config();
const router = express.Router();

router.get('/confessions', async (req, res) => {
    try {
        const confessions = await Confession.find().exec();
        
        const finalConfessions = await confessions.reduce(async (result, confession) => {
            const likes = await Likes_Dislikes.find({ confessionId: confession._id, liked: true }).exec();
            const dislikes = await Likes_Dislikes.find({ confessionId: confession._id, disliked: true }).exec();
            const confWithLikesDislikes = { ...confession._doc, likes, dislikes }
            const resultP = await result;
            resultP.push(confWithLikesDislikes);
            return resultP;
        }, [])

        res.json({ confessions: finalConfessions, success: true });
    } catch (error) {
        console.log("Error:-", error);
        res.json({ error, success: false });
    }
})

router.get('/confessions/:college', async (req, res) => {
    try {
        const confessions = await Confession.find({ college: req.params.college }).exec();

        const finalConfessions = await confessions.reduce(async (result, confession) => {
            const likes = await Likes_Dislikes.find({ confessionId: confession._id, liked: true }).exec();
            const dislikes = await Likes_Dislikes.find({ confessionId: confession._id, disliked: true }).exec();
            const confWithLikesDislikes = { ...confession._doc, likes, dislikes }
            const resultP = await result;
            resultP.push(confWithLikesDislikes);
            return resultP;
        }, [])

        res.json({ confessions: finalConfessions, success: true });
    } catch (error) {
        console.log("Error:-", error);
        res.json({ error, success: false });
    }
})

router.post('/like_dislike', async (req, res) => {
    try {
        const { confessionId, userId, liked, disliked } = req.body;
        const confession = await Likes_Dislikes.findOne({ confessionId, userId }).exec();
        let result;
        if(confession) {
            if(!liked && !disliked) {
                result = await Likes_Dislikes.deleteOne({ confessionId, userId });
                console.log("LIKE DOCUMENT DELETED:-", result);
            }
            else {
                confession.liked = liked;
                confession.disliked = disliked;
                result = await confession.save();
            }
        }
        else {
            const like_dislike_doc = new Likes_Dislikes(req.body);
            result = await like_dislike_doc.save();
        }
        res.json({ result, success: true });
    } catch (error) {
        console.log("Error:-", error);
        res.json({ error, success: false });
    }
})

module.exports = router;