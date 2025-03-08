const ShortUrlSchema = require('../../modal/ShortUrlSchema');

const renderUrl = async (req, res) => {
  const shorId = req.params;

  const existUrl = await ShortUrlSchema.findOne(shorId);
  // console.log(existUrl);

  if (!existUrl) {
    return res.render('error', {
      error: "we couldn't find the page your looking for",
    });
  }
  if (existUrl.isAuth) {
    const url = await ShortUrlSchema.findByIdAndUpdate(
      existUrl.id,
      { $push: { visitHistory: { clickedAt: Date.now() } } },
      { new: true }
    );
    res.redirect(url.url);
  } else {
    res.redirect(existUrl.url);
  }

  // res.render(existUrl.url)------engin add korar por eita dibo ekhn erro ashtece tai cmt koira rakhci;
};
// const visitHistory = async (req, res) => {
//   const shorId = req.params;

//   const existUrl = await ShortUrlSchema.findOne(shorId);
//   if (!existUrl) {
//     return res.status(404).send('ID not found.!');
//   }
//   res.send(existUrl);
// };

module.exports = { renderUrl };
