const mongoose = require('mongoose');

const ReservationSchema = mongoose.Schema({
    roomId: {
        type: String,
        required: true
    },
    startedDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    numberOfPersons: {
        type: Number,
    },
    reservationState: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
    },
    ownerEmail: {
        type: String,
        required: true
    }
});

ReservationSchema.method('transform', function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
 
    return obj;
});

ReservationSchema.statics.getAllReservations = function (cb){
    this.find({}, function(err, quizzes) {
        if (err) return cb(err);
        cb(null, quizzes);
    });
}

module.exports = mongoose.model('Reservation', ReservationSchema);