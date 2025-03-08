const ValidateEmail = require('../../Helpers/ValidateEmail');
const validatePassword = require('../../Helpers/validatePassword');
const registrationSchema = require('../../modal/registrationSchema');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
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

    if (!existingUser) {
      return res.status(400).send({ error: 'User not Found!' });
    }
    //check password..
    const match = await bcrypt.compare(password, existingUser.password);
    if (!match) {
      return res.status(400).send({ error: 'User not Found!' });
    }
    // access Token..
    const access_token = jwt.sign(
      {
        data: {
          id: existingUser.id,
          email: existingUser.email,
        },
      },
      process.env.JWT_KEY,
      { expiresIn: '1d' }
    );
    // const loggedUser = {
    //   id: existingUser.id,
    //   email: existingUser.email,
    //   fullName: existingUser.fullName,
    // };
    res.status(200).cookie('access_token', access_token).redirect('/');
  } catch (error) {
    return res
      .status(400)
      .send({ error: 'Server side error! Please Try again' });
  }
};
module.exports = login;
