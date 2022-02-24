const jwt = require("jsonwebtoken");
const User = require('../models/User');

module.exports = {
    ensureAuth: async (req, res, next) => {
        const authHeader = req.headers.authorization;
        if(authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.SECRET, async (err, user) => {
                if(err) {
                    console.log(err);
                    // Forbidden:- the server understands the request but refuses to authorize it
                    return res.sendStatus(403).send(err);
                }
                try {
                    const userDoc = await User.findById(user).exec();
                    req.user = user;
                    next();
                } catch (error) {
                    console.log("AUTH Middleware:-", error);
                    res.sendStatus(403);
                }
            })
        }
        else {
            // Unauthorized:- lacks valid authentication credentials
            res.sendStatus(401);
        }
    }
}