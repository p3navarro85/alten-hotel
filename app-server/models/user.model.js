const mongoose = require('mongoose');

const opts = { toJSON: { virtuals: true } };

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userLevel: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, opts);

UserSchema.virtual('name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
};

UserSchema.method('transform', function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
 
    return obj;
});

UserSchema.statics.getAllUsers = function (cb){
    this.find({}, function(err, quizzes) {
        if (err) return cb(err);
        cb(null, quizzes);
    });
}

module.exports = mongoose.model('User', UserSchema);