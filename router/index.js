const express = require('express');
const apiRoute = require('./api');
const {
  renderUrl,
  visitHistory,
} = require('../contrillers/shorturl/renderUrl');
const { homePage, loginPage, registrationPage } = require('./staticSites');
const router = express.Router();

router.use(process.env.BASE_API_URL, apiRoute);

router.get('/', homePage);

router.get('/login', loginPage);
router.get('/registration', registrationPage);
router.get('/visitHistory/:shorId', visitHistory);
router.get('/:shorId', renderUrl);
router.use((req, res) => {
  // res.send('page not found!');
  res.render('error');
});
module.exports = router;
// 1.18.49
