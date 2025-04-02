const mongoose = require('mongoose');// importing the mongoose library / package
const colors = require('colors');
require('dotenv').config();     //  getting mongo server URL for listening from .env file

const MongoURL = process.env.MongoURL;

mongoose.connect(MongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("Connected to mongoose server...\n".green.bold);
});

db.on('disconnected', () => {
    console.log("DataBase connection lost !!!\n".bgYellow.bold.red);
});

db.on('error', () => {
    console.log("DataBase Server Error occured\n".bgRed.bold.white);
});

module.exports = db ;