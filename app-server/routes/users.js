const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const user_controller = require('../controllers/user.controller');
const { auth } = require('../middlewares/auth');

router.get('/', async (req, res) => {
    try {        
        User.find()
            .then(users => {    
            let returnedUsers = [];
            
            for (let i = 0; i < users.length; i++) {
                returnedUsers.push(users[i].transform());
            }
            res.send(returnedUsers);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        
    } catch (err) {
        res.json({ message: err });
    }
});

router.get('/loadData', user_controller.load_data);
router.post('/create', user_controller.user_create);
router.get('/:id', user_controller.user_details);
router.put('/:id/update', user_controller.user_update);
router.delete('/:id/delete', user_controller.user_delete);

module.exports = router;