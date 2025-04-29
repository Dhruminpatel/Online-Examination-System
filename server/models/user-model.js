const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userschema = new mongoose.Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  phone: { type: String, require: true },
  password: { type: String, require: true },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

//secure to bcrypt the password
userschema.pre('save', async function (next) {
  // console.log("premethods",this)
  const user = this;
  if (!user.isModified('password')) {
    next();
  }
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashpassword;
  } catch (error) {
    next(error);
  }
});

//JSON web tokens
userschema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEYS,
      { expiresIn: '1d' }
    );
  } catch (error) {
    console.error(error);
  }
};
//define the collections name
const User = new mongoose.model('UserInput', userschema);

module.exports = User;
