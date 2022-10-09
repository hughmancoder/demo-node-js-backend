const jwt = require('jsonwebtoken');
const config = require('config'); // make sure environment variable is set
module.exports = function (req, res, next) {
    // stored in header in users.js
    const token = req.header('x-auth-token');
    // Unauthorized response status
    if (!token) return res.status(401).send('Acess denied no token provided');
    // verify if token is valid
    try {
        const decoded_payload = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded_payload;
        console.log("authentication info: decoded payload is: ", req.user);
        // pass control to next middleware function in request processing pipeline
        next();
    }
    catch(ex) {
        // bad request so terminate lifecycle
        res.status(400).send(`invalid token ${ex}`);
    }
}

