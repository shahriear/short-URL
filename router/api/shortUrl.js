const express = require('express');
const makeShorturl = require('../../contrillers/shorturl/MakeShortUrl');
const shorturlRouter = express.Router();

shorturlRouter.post('/shortUrl', makeShorturl);

module.exports = shorturlRouter;
