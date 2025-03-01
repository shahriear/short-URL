const express = require('express');
const reg = require('../../contrillers/auth/Registration');
const login = require('../../contrillers/auth/Loging');
const authRoute = express.Router();

authRoute.post('/registration', reg);
authRoute.post('/login', login);

module.exports = authRoute;
