const ValidateEmail = require('../../Helpers/ValidateEmail');
const validatePassword = require('../../Helpers/validatePassword');
const registrationSchema = require('../../modal/registrationSchema');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const reg = async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(fullName, email, password);

  try {
    if (!fullName) {
      return res.status(400).send({ error: 'Name is required!' });
    }
    if (!email) {
      return res.status(400).send({ error: 'email is required!' });
    }
    if (!ValidateEmail(email)) {
      return res.status(400).send({ error: 'email address is invalid!' });
    }
    if (!password) {
      return res.status(400).send({ error: 'password is required!' });
    }

    const passwordValidResult = validatePassword(password);
    if (passwordValidResult) {
      return res.status(400).send({ error: passwordValidResult });
    }
    const existingUser = await registrationSchema.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ error: 'Email already exist.! try again with another Email ' });
    }

    bcrypt.hash(password, saltRounds, function (err, hash) {
      const users = registrationSchema({
        fullName,
        email,
        password: hash,
      });
      users.save();

      res.redirect('/login');
    });
  } catch (error) {
    return res
      .status(400)
      .send({ error: 'Server side error! Please Try again' });
  }
};
module.exports = reg;
