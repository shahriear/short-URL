const express = require('express');
const apiRoute = require('./api');
const { renderUrl } = require('../contrillers/shorturl/renderUrl');
const { homePage, loginPage, registrationPage } = require('./staticSites');
const validateUser = require('../middlewares/authMiddleware');
const registrationSchema = require('../modal/registrationSchema');
const router = express.Router();

router.use(process.env.BASE_API_URL, apiRoute);

router.get('/', validateUser, homePage);

router.get('/login', loginPage);
router.get('/registration', registrationPage);
router.get('/logout', (req, res) => {
  res.clearCookie('access_token').redirect('/login');
});

router.get('/dashboard', validateUser, async (req, res) => {
  if (req.user) {
    const userData = await registrationSchema
      .findById(req.user.id)
      .select('-password')
      .populate('shortUrls');
    console.log(userData);

    res.render('dashboard', {
      urlHistory: userData,
      loggedUser: req.user,
    });
  } else {
    res.redirect('/login');
  }
});

router.get('/:shorId', renderUrl);
router.use((req, res) => {
  // res.send('page not found!');
  res.render('error');
});
module.exports = router;
// 1.18.49
