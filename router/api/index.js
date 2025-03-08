const express = require('express');
const authRoute = require('./auth');
const shorturlRouter = require('./shortUrl');
const validateUser = require('../../middlewares/authMiddleware');
const apiRoute = express.Router();

apiRoute.use('/auth', authRoute);
apiRoute.use('/generate', validateUser, shorturlRouter);

module.exports = apiRoute;
