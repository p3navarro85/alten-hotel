var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config();
console.log(process.env.DB_CONNECTION);

// const fs = require('fs');
/*
let dataCountries = require('./data/countries.json');
let countries = [];

var index = 1;
for (var element in dataCountries) {
    countries.push(
        {
            id: index,
            name: element,
            cities: dataCountries[element]
        }
    );
    index++;
}
*/


/*
fs.readFile('./data/countries.json', (err, data) => {
    if (err) throw err;
    dataCountries = JSON.parse(data);
    var index = 1;
    for (var element in dataCountries) {
        countries.push(
            {
                id: index,
                name: element,
                cities: dataCountries[element]
            }
        );
        index++;
    }
});
*/

// Connect to DB
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
        console.log('DB succesfull connected');
    }
);

const Country = require('./models/Country');
let countries = [];

Country.getAllCountries(function(err, quizes) {
    console.log('inside countryCallBack');
    countries = quizes;
}); 

// GraphQL schema
var schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
        country(id: Int!): Country
        countries(name: String): [Country]
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    },
    type City {
        name: String
    },
    type Country {
        id: Int
        name: String
        cities: [String]
    }
`);
var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
];

var getCourse = function(args) { 
    var id = args.id;
    return coursesData.filter(course => {
        return course.id == id;
    })[0];
}

var getCourses = function(args) {
    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic);
    } else {
        return coursesData;
    }
}

var getCountry = function(args) {
    var id = args.id;
    return countries.filter(country => {
        return country.id == id;
    })[0];
}

var getCountries = function(args) {
    if (args.name) {
        var name = args.name;
        return countries.filter(country => country.name === name);
    } else {
        return countries;
    }
}

var root = {
    course: getCourse,
    courses: getCourses,
    country: getCountry,
    countries: getCountries
};
// Create an express server and a GraphQL endpoint
var app = express();

app.use( cors() );
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));