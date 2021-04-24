const User = require('../models/user.model');
const Reservation = require('../models/reservation.model');
const Room = require('../models/room.model');

const bcrypt = require('bcryptjs');

// Temporary function just to load data. Must be deleted later.

exports.load_data = (req, res, next) => {
    
    let salt = bcrypt.genSaltSync(10);

    let admin = new User(
        {
            firstName: 'Pavel',
            lastName: 'Navarro',
            userName: 'Admin',
            email: 'admin@mail.com',
            password: bcrypt.hashSync('admin', salt),
            userLevel: 'Admin',
            role: '.'
        }
    );

    let roomA1 = new Room(
        {
            number: "A1",
            description: "This is the room A1",
            price: 232.54,
            type: "Junior",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomA2 = new Room(
        {
            number: "A2",
            description: "This is the room A2",
            price: 342.54,
            type: "Double",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomA3 = new Room(
        {
            number: "A3",
            description: "This is the room A3",
            price: 398.21,
            type: "Senior",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomA4 = new Room(
        {
            number: "A4",
            description: "This is the room A4",
            price: 252.34,
            type: "Junior",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomB1 = new Room(
        {
            number: "B1",
            description: "This is the room B1",
            price: 454.54,
            type: "Senior",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomB2 = new Room(
        {
            number: "B2",
            description: "This is the room B2",
            price: 331.84,
            type: "Single",
            state: "Maintenance",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomB3 = new Room(
        {
            number: "B3",
            description: "This is the room B3",
            price: 565.71,
            type: "Senior",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomC1 = new Room(
        {
            number: "C1",
            description: "This is the room C1",
            price: 418.24,
            type: "Single",
            state: "Maintenance",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomC2 = new Room(
        {
            number: "C2",
            description: "This is the room C2",
            price: 565.12,
            type: "Double",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomC3 = new Room(
        {
            number: "C3",
            description: "This is the room C3",
            price: 267.43,
            type: "Junior",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    let roomC4 = new Room(
        {
            number: "C4",
            description: "This is the room C4",
            price: 315.78,
            type: "Single",
            state: "Available",
            reservedStartedDate: null,
            reservedEndDate: null,
        }
    )

    try {
        User.deleteMany({ }).then(function(){
            console.log("Users deleted"); // Success
            let data = [admin];
            let returnedData = [];
            data.map(entry => entry.save(function (err, entry) {
                if (err) {
                    return next(err);
                }
                returnedData.push(entry.transform());
            }))
            // res.send(returnedData);
        }).catch(function(error){
            console.log(error); // Failure
        });
        console.log('User Data successfully deleted');
    } catch (err) {
       console.log(err);
    }
    
    try {
        Reservation.deleteMany({ }).then(function(){

        }).catch(function(error){
            console.log(error); // Failure
        });
        console.log('Reservation Data successfully deleted');
    } catch (err) {
       console.log(err);
    } 

    try {
        Room.deleteMany({ }).then(function(){
            console.log("Rooms deleted"); // Success
            let data = [roomA1, roomA2, roomA3, roomA4, roomB1,
                roomB2, roomB3, roomC1, roomC2, roomC3, roomC4];
            
            let returnedData = [];
            data.map((entry, index ) => entry.save(function (err, entry) {
                if (err) {
                    return next(err);
                }
                if(index == 2){
                    console.log(entry.transform());
                    let reservation1 = new Reservation(
                        {
                            roomId: entry.transform().id,
                            startedDate: new Date(2021, 6, 13),
                            endDate: new Date(2021, 6, 24),
                            numberOfPersons: 2,
                            reservationState: "Confirmed",
                            ownerName: "Jone Doe",
                            ownerEmail: "doe@email.com"
                        }
                    )

                    reservation1.save(function (err, entry) {
                        if (err) {
                            return next(err);
                        }
                        console.log(entry.transform());
                        roomA3.reservedStartedDate = entry.transform().startedDate;
                        roomA3.reservedEndDate = entry.transform().endDate;
                        roomA3.state = "Reserved";
                        roomA3.save();
                    })
                }
                if(index == 9){
                    console.log(entry.transform());
                    let reservation2 = new Reservation(
                        {
                            roomId: entry.transform().id,
                            startedDate: new Date(2021, 5, 8),
                            endDate: new Date(2021, 5, 13),
                            numberOfPersons: 1,
                            reservationState: "Confirmed",
                            ownerName: "Jane Doe",
                            ownerEmail: "jane@email.com"
                        }
                    )

                    reservation2.save(function (err, entry) {
                        if (err) {
                            return next(err);
                        }
                        console.log(entry.transform());
                        roomC3.reservedStartedDate = entry.transform().startedDate;
                        roomC3.reservedEndDate = entry.transform().endDate;
                        roomC3.state = "Reserved";
                        roomC3.save();
                    })
                }
                
                returnedData.push(entry.transform());

            })) 
            
            res.send(returnedData);
        }).catch(function(error){
            console.log(error); // Failure
        }).finally(function(){ 
            
            //res.send(returnedData);
         });
        
    } catch (err) {
       console.log(err);
    }  

    

    
};

exports.user_create = function (req, res, next) {
    
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    let salt = bcrypt.genSaltSync(10);

    let user = new User(
        {
            firstName,
            lastName,
            userName: firstName.substring(0, 1) + lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            userLevel: req.body.userLevel,
            role: req.body.role
        }
    );

    user.save(function (err, user) {
        if (err) {
            return next(err);
        }
        res.send(user.transform())
    })
};

exports.user_details = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user.transform());
    })
};

exports.user_update = function (req, res, next) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function (err, user) {
        if (err) return next(err);
        res.send(user.transform());
    });
};

exports.user_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return next(err);
        res.send(user.transform());
    })
};