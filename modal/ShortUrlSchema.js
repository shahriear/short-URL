const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shortUrl = new Schema({
  url: {
    type: String,
    required: true,
  },
  shorId: {
    type: String,
    required: true,
  },
  // author: {
  //   ref: 'User',
  //   type: Schema.Types.ObjectId,
  // },
  isAuth: {
    type: Boolean,
    default: false,
  },
  visitHistory: [
    {
      clickedAt: {
        type: Date,
      },
    },
  ],
});

module.exports = mongoose.model('ShortUrl', shortUrl);
