const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
    },
    state: {
        type: String,
    },
    reservedStartedDate: {
        type: Date
    },
    reservedEndDate: {
        type: Date
    },
});

RoomSchema.method('transform', function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
 
    return obj;
});

RoomSchema.statics.getAllRooms = function (cb){
    this.find({}, function(err, quizzes) {
        if (err) return cb(err);
        cb(null, quizzes);
    });
}

module.exports = mongoose.model('Room', RoomSchema);