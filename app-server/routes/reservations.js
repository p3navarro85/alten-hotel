const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation.model');
const reservation_controller = require('../controllers/reservation.controller');

router.get('/', async (req, res) => {
    try { 
        Reservation.find()
            .then(reservations => {    
            let returnedReservations = [];
            
            for (let i = 0; i < reservations.length; i++) {
                returnedReservations.push(reservations[i].transform());
            }
            
            res.send(returnedReservations);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                });
            });
        
    } catch (err) {
        res.json({ message: err });
    }
});
router.post('/create', reservation_controller.reservation_create);
router.get('/:id', reservation_controller.reservation_details);
router.put('/:id/update', reservation_controller.reservation_update);
router.delete('/:id/delete', reservation_controller.reservation_delete);
router.post('/filtered', reservation_controller.reservation_filtered);

module.exports = router;