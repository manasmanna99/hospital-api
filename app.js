const express = require('express');
const passport = require('passport');

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(passport.initialize());


app.use('/', require('./routes'));

module.exports = app;