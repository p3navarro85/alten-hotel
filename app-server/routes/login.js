const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { isTokenAuthentic } = require('../middlewares/auth');
// const login_controller = require('../controllers/login.controller'); // [TODO][REFACTOR] Add POST logic to login controller.


const bcrypt = require('bcryptjs'); // 'bcryptjs' has zero dependencies, and trying to install 'bcrypt' brought several problems.
const jwt = require('jsonwebtoken');


router.get('/', isTokenAuthentic);

router.post('/', async (req, res) => {

    let body = req.body;

    User.findOne({ email: body.email }, (err, userDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if ( !userDB ) {
            return res.status(400).json({
                ok: false,
                message: 'Please review the information you entered and try again.'
            });
        };

        let cond = bcrypt.compareSync(body.password, userDB.password);

        if (!cond ) {
            return res.status(400).json({
                ok: false,
                message: 'Please review the information you entered and try again.'
            });
        };


        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: 2592000 });
        // Expires in: 1 month.
        // This value should be called as process.env.TOKEN_EXPIRATION, but for some reason is not working.
        // It's not so important to get stuck with this before MVP launch.
        // [TODO] Make it work with process.env.TOKEN_EXPIRATION after MVP launch or when requested.
        
        return res.send({
            ok: true,
            user: userDB,
            token
        });

    });

});

module.exports = router;