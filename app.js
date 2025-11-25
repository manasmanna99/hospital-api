// app.js
const express = require('express');
const passport = require('passport');

const app = express();

// parse form / JSON bodies
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// initialize passport (for JWT)
app.use(passport.initialize());

// main routes
app.use('/', require('./routes'));

module.exports = app;
