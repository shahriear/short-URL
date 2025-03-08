var jwt = require('jsonwebtoken');
const validateUser = (req, res, next) => {
  try {
    const token = req.cookies;
    if (token.access_token) {
      // if (!token.access_token) return res.status(400).send('Unauthorized');
      jwt.verify(
        token.access_token,
        process.env.JWT_KEY,
        function (err, decoded) {
          if (err) {
            req.user = null;
            next();
          }

          if (decoded.data) {
            req.user = decoded.data;
            next();
          }
        }
      );
    } else {
      req.user = null;
      next();
    }
  } catch (error) {
    res.status(500).send('Internal Server Error !');
  }
};

module.exports = validateUser;

//
//
//  var jwt = require('jsonwebtoken');
// const validateUser = (req, res, next) => {
//   try {
//     const token = req.cookies;

//   var decoded = jwt.verify(token.access_token, process.env.JWT_KEY);

//   if (decoded.data) {
//     next();
//     req.user =decoded.data
//   } catch (error) {
//     res.status(400).send('Unauthorized User!');
//   }

// }
// 58:54

// var jwt = require('jsonwebtoken');
// const validateUser = (req, res, next) => {
//   try {
//     const token = req.cookies;

//     var decoded = jwt.verify(token.access_token, process.env.JWT_KEY);
//     console.log(decoded.data);

//     if (decoded.data) {
//       req.user = decoded.data;
//       next();
//     } else {
//       res.status(400).send('Unauthorized User!');
//     }
//   } catch (error) {
//     res.status(500).send('Server side Error!');
//   }
// };
