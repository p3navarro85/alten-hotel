# Project Title

Alten Hotel

Example app for Alten application process

## Getting Started

The project is estrutured in two main applications.
app-client is the front end app developed in Angular 9
app-server is the backend REST API developed in NodeJS and MongoDB

The app-client have a home page with the registration and login form.

After the login you access to the administration module
where you can manage all the app data: users, reservations 
and rooms.

All app modules are structured in 4 submodules: grid, main,
form and modal. All have functional filters implemented.

Note that the dashboard is not funcional.

The app have basic security implemented.

Have Docker support but for time was not tested.

I used thrid parties themes and libraries:
starboostrap-sb-admin-2
luxe free template for the home page theme
boostrap 4

Note: the calendar dropdown should be clicked on the calendar
icon not in the entire field (this is an issue from the plugin used)

### Prerequisites

In order to install the app you need to have Node installed
and a MongoDB database, you can setup the Mongo connection
on the app-server/.env file:

DB_CONNECTION=mongodb://admin:admin@localhost:27017/britondb

you have to setup your connection first at all

Then install all package dependencies on each app

The app came with some demo data that you need to populate
before to run the app-client

by default the app-client run on http://localhost:4200/home
and the app-server on http://localhost:3000

to populate the demo data go to:
http://localhost:3000/users/loadData

then you can login in the app with:
"email":"admin@mail.com"
"password":"admin"
with no quotes

### Installing

On app-server:
-npm install
-npm run start

On app-client
-nom install 
-ng serve

## Authors

* **Pavel Navarro** - *Initial work* - [PurpleBooth](https://github.com/p3navarro85)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Thanks to Alten for the opportunity


