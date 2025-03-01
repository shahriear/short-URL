const ShortUrlSchema = require('../../modal/ShortUrlSchema');

const renderUrl = async (req, res) => {
  const shorId = req.params;

  const existUrl = await ShortUrlSchema.findOneAndUpdate(
    shorId,
    { $push: { visitHistory: { clickedAt: Date.now() } } },
    { new: true }
  );
  // console.log(existUrl);

  if (!existUrl) {
    return res.render('error', {
      error: "we couldn't find the page your looking for",
    });
  }

  res.redirect(existUrl.url);
  // res.render(existUrl.url)------engin add korar por eita dibo ekhn erro ashtece tai cmt koira rakhci;
};
const visitHistory = async (req, res) => {
  const shorId = req.params;

  const existUrl = await ShortUrlSchema.findOne(shorId);
  if (!existUrl) {
    return res.status(404).send('ID not found.!');
  }
  res.send(existUrl);
};

module.exports = { renderUrl, visitHistory };
