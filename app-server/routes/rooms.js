const express = require('express');
const router = express.Router();
const Room = require('../models/room.model');
const room_controller = require('../controllers/room.controller');

router.get('/', async (req, res) => {
    try { 
        Room.find()
            .then(rooms => {    
            let returnedRooms = [];
            
            for (let i = 0; i < rooms.length; i++) {
                returnedRooms.push(rooms[i].transform());
            }
            
            res.send(returnedRooms);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        
    } catch (err) {
        res.json({ message: err });
    }
});
router.post('/create', room_controller.room_create);
router.get('/:id', room_controller.room_details);
router.put('/:id/update', room_controller.room_update);
router.delete('/:id/delete', room_controller.room_delete);
router.post('/filtered', room_controller.room_filtered);

module.exports = router;