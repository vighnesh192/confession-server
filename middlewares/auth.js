const jwt = require("jsonwebtoken");

module.exports = {
    ensureAuth: (req, res, next) => {
        const authHeader = req.header.authorization;
        if(authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.SECRET, (err, user) => {
                if(err) {
                    // Forbidden:- the server understands the request but refuses to authorize it
                    return res.sendStatus(403);
                }
                next();
            })
        }
        else {
            // Unauthorized:- lacks valid authentication credentials
            res.sendStatus(401);
        }
    }
}