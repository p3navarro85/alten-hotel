const Reservation = require('../models/reservation.model');

exports.reservation_create = function (req, res, next) {
    let reservation = new Reservation(
        {
            roomId: req.body.roomId,
            startedDate: req.body.startedDate,
            endDate: req.body.endDate,
            numberOfPersons: req.body.numberOfPersons,
            reservationState: req.body.reservationState,
            ownerName: req.body.ownerName,
            ownerEmail: req.body.ownerEmail,
        }
    );

    reservation.save(function (err, reservation) {
        if (err) {
            return next(err);
        }
        res.send(reservation.transform())
    })
};

exports.reservation_details = function (req, res) {
    Reservation.findById(req.params.id, function (err, reservation) {
        if (err) return next(err);
        res.send(reservation.transform());
    })
};

exports.reservation_update = function (req, res, next) {
    Reservation.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, reservation) {
        if (err) return next(err);
        res.send(reservation.transform());
    });
};

exports.reservation_delete = function (req, res) {
    Reservation.findByIdAndRemove(req.params.id, function (err, reservation) {
        if (err) return next(err);
        res.send(reservation.transform());
    })
};

exports.reservation_filtered = function (req, res, next) {
    let filter = {};
    if (req.body.roomId) {
      filter['roomId'] = new RegExp(req.body.roomId, "i");
    }   
    if (req.body.ownerName) {
        filter['ownerName'] = new RegExp(req.body.ownerName, "i");
    }  
    if (req.body.ownerEmail) {
    filter['ownerEmail'] = new RegExp(req.body.ownerEmail, "i");
    }   
    if (req.body.reservationState) {
      filter['reservationState'] = req.body.reservationState;
    }
    if (req.body.startedDate && req.body.endDate) {
        filter['startedDate'] = { $gte: req.body.startedDate, $lte: req.body.endDate };
    }
    else if (req.body.startedDate) {
        filter['startedDate'] = {$gte: startOfDay(new Date(`${req.body.startedDate}T00:00:00`)), $lte: endOfDay(new Date(`${req.body.startedDate}T00:00:00`))}
    }
    else if (req.body.endDate) {
        filter['startedDate'] = {$gte: startOfDay(new Date(`${req.body.endDate}T00:00:00`)), $lte: endOfDay(new Date(`${req.body.endDate}T00:00:00`))}
    }
    
    Reservation.find(filter, function (err, reservations) {
      if (err) return next(err);
      res.send(reservations.map((qt) => qt.transform()));
    }).sort({number: -1});
  };