const express = require('express');
const authRoute = require('./auth');
const shorturlRouter = require('./shortUrl');
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/generate', shorturlRouter);

module.exports = apiRoute;
