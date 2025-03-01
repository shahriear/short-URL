const mongoose = require('mongoose');
const dbConnect = () => {
  mongoose.connect(process.env.DB_URL).then(() => console.log('Connected!'));
};
module.exports = dbConnect;

// vNudpGRAgfmddkFS; fltt7Sf4Od6P8zeQ
