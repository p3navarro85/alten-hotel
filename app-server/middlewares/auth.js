const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');


// [TODO][REFACTOR] Abstract common services between auth() and isTokenAuthentic().

// Verifies token. Called as middleware.
let auth = (req, res, next) => {
    
    let token = req.get('token');
    
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
             });
        };

        req.user = decoded.user;
        next();
    });

};

// Same as before, but is used for the guard in front-end.
let isTokenAuthentic = (req, res) => {
    
    let token = req.get('token');
    
    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err
             });
        } else {
            return res.status(200).json({
                ok: true
            })
        };

    });
    
};

module.exports = { isTokenAuthentic, auth };