const generateShortID = require('../../Helpers/generateUrl');
const isUrlValid = require('../../Helpers/isUrlValid');
const registrationSchema = require('../../modal/registrationSchema');
const ShortUrlSchema = require('../../modal/ShortUrlSchema');
const makeShorturl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.render('index', {
      error: 'URL is Required',
    });
  }
  if (!isUrlValid(url)) {
    return res.render('index', {
      error: 'URL is not valid!',
    });
  }
  const shorted = generateShortID(url);
  if (req.user) {
    // console.log(req.user);
    // return
    const existUrl = await ShortUrlSchema.findOneAndUpdate(
      { url },
      { $set: { shorId: shorted } },
      { new: true }
    );

    // console.log(existUrl);

    if (existUrl) {
      // await registrationSchema.findByIdAndUpdate(req.user.id, {
      //   $push: { shortUrls: existUrl.id },
      // });
      return res.render('index', {
        message: 'short url creat successfully.! ',
        longUrl: existUrl.url,
        shortUrl: `http://localhost:3000/${existUrl.shorId}`,
        loggedUser: req.user,
      });
    }

    const shortUrl = new ShortUrlSchema({
      url: url,
      shorId: shorted,
      isAuth: true,
    });
    shortUrl.save();
    await registrationSchema.findByIdAndUpdate(req.user.id, {
      $push: { shortUrls: shortUrl.id },
    });
    // console.log(userData, req.id);

    res.render('index', {
      message: 'short url creat successfully.! ',
      longUrl: shortUrl.url,
      shortUrl: `http://localhost:3000/${shortUrl.shorId}`,
    });
  } else {
    const existUrl = await ShortUrlSchema.findOneAndUpdate(
      { url },
      { $set: { shorId: shorted } },
      { new: true }
    );
    // console.log(existUrl);

    if (existUrl) {
      return res.render('index', {
        message: 'short url creat successfully.! ',
        longUrl: existUrl.url,
        shortUrl: `http://localhost:3000/${existUrl.shorId}`,
      });
    }

    const shortUrl = new ShortUrlSchema({
      url: url,
      shorId: shorted,
    });
    shortUrl.save();

    res.render('index', {
      message: 'short url creat successfully.! ',
      longUrl: shortUrl.url,
      shortUrl: `http://localhost:3000/${shortUrl.shorId}`,
    });
  }

  // const shortUrl = new ShortUrlSchema({
  //   url: url,
  //   shorId: generateShortID(url),
  // });

  // shortUrl.save();
  // res.send(shortUrl);

  // const shortUrl = new ShortUrlSchema({
  //   url: url,
  //   shortID: generateShortID(url),
  // });
  // shortUrl.save();
  // res.send(shortUrl);
};

module.exports = makeShorturl;

//time:36:31
