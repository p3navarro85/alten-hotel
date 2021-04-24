const Room = require('../models/room.model');

exports.room_create = function (req, res, next) {
    let room = new Room(
        {
            number: req.body.number,
            description: req.body.description,
            price: req.body.price,
            type: req.body.type,
            state: req.body.state,
            reservedStartedDate: req.body.reservedStartedDate,
            reservedEndDate: req.body.reservedEndDate
        }
    );

    room.save(function (err, room) {
        if (err) {
            return next(err);
        }
        res.send(room.transform())
    })
};

exports.room_details = function (req, res) {
    Room.findById(req.params.id, function (err, room) {
        if (err) return next(err);
        res.send(room.transform());
    })
};

exports.room_update = function (req, res, next) {
    Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, room) {
        if (err) return next(err);
        res.send(room.transform());
    });
};

exports.room_delete = function (req, res) {
    Room.findByIdAndRemove(req.params.id, function (err, room) {
        if (err) return next(err);
        res.send(room.transform());
    })
};

exports.room_filtered = function (req, res, next) {
    let filter = {};
    if (req.body.number) {
      filter['number'] = new RegExp(req.body.number, "i");
    }
    if (req.body.type) {
      filter['type'] = req.body.type;
    }
    if (req.body.state) {
      filter['state'] = req.body.state;
    }

    if (req.body.reservedStartedDate && req.body.reservedEndDate) {
        filter['reservedStartedDate'] = { $gte: req.body.reservedStartedDate, $lte: req.body.reservedEndDate };
    }
    else if (req.body.reservedStartedDate) {
        filter['reservedStartedDate'] = {$gte: startOfDay(new Date(`${req.body.reservedStartedDate}T00:00:00`)), $lte: endOfDay(new Date(`${req.body.reservedStartedDate}T00:00:00`))}
    }
    else if (req.body.reservedEndDate) {
        filter['reservedStartedDate'] = {$gte: startOfDay(new Date(`${req.body.reservedEndDate}T00:00:00`)), $lte: endOfDay(new Date(`${req.body.reservedEndDate}T00:00:00`))}
    }

    if (req.body.priceHigher && req.body.priceLower) {
        filter['price'] = { $gte: req.body.priceLower, $lte: req.body.priceHigher };
    }
    else if (req.body.priceLower) {
        filter['price'] = { $gte: req.body.priceLower }
    }
    else if (req.body.priceHigher) {
        filter['price'] = { $lte: req.body.priceHigher }
    }
    
    Room.find(filter, function (err, rooms) {
      if (err) return next(err);
      res.send(rooms.map((qt) => qt.transform()));
    }).sort({number: -1});
  };